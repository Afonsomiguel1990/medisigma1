import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

// Define o caminho para a pasta de conteúdo do blog
const postsDirectory = path.join(process.cwd(), 'src/content/blog');

// Função para extrair excerpt do conteúdo
function extractExcerpt(content: string, maxLength: number = 150): string {
  // Remove frontmatter se ainda existir
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---/, '').trim();
  
  // Remove markdown headers (#, ##, ###)
  let cleanContent = contentWithoutFrontmatter.replace(/^#{1,6}\s+.*$/gm, '');
  
  // Remove tags HTML/JSX como <br />, <table>, etc.
  cleanContent = cleanContent.replace(/<[^>]*>/g, '');
  
  // Remove asteriscos de negrito (**texto**)
  cleanContent = cleanContent.replace(/\*\*(.*?)\*\*/g, '$1');
  
  // Remove asteriscos de itálico (*texto*)
  cleanContent = cleanContent.replace(/\*(.*?)\*/g, '$1');
  
  // Remove links markdown [texto](url)
  cleanContent = cleanContent.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  
  // Remove linhas vazias e quebras excessivas
  cleanContent = cleanContent.replace(/\n\s*\n/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Pega o primeiro parágrafo significativo
  const firstParagraph = cleanContent.split('\n')[0] || cleanContent;
  
  // Trunca no limite de caracteres, respeitando palavras
  if (firstParagraph.length <= maxLength) {
    return firstParagraph;
  }
  
  const truncated = firstParagraph.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > 0 
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...';
}

export function getSortedPostsData() {
  // Obtém os nomes dos ficheiros dentro de /src/content/blog
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.mdx'));
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".mdx" do nome do ficheiro para obter o id (slug)
    const slug = fileName.replace(/\.mdx$/, '');

    // Lê o ficheiro markdown como string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Usa gray-matter para analisar a secção de metadados do post (frontmatter)
    const matterResult = matter(fileContents);

    // Extrai excerpt do conteúdo real
    const excerpt = matterResult.data.description || extractExcerpt(matterResult.content);
    
    // Extrai imagem_destaque se disponível
    const imagem_destaque = matterResult.data.imagem_destaque || null;

    // Combina os dados com o slug
    return {
      slug,
      excerpt,
      imagem_destaque,
      ...(matterResult.data as { date: string; title: string }), // Adiciona tipagem para o frontmatter esperado
    };
  });

  // Ordena os posts por data (mais recentes primeiro)
  return allPostsData.sort((a, b) => {
    if (!a || !b) return 0;
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.mdx'));

  // Retorna uma lista de objetos com a chave `params` contendo o `slug`
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Usa compileMDX para React Server Components
  const { content, frontmatter } = await compileMDX<{ date: string; title: string; description?: string }>({
    source: fileContents,
    options: {
      parseFrontmatter: true,
    },
  });

  // Retorna os dados
  return {
    slug,
    content,
    frontmatter,
  };
}

export function getAllPostsMetadata() {
  // Obtém os nomes dos ficheiros dentro de /src/content/blog
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.mdx'));
  const allPostsData = fileNames.map((fileName) => {
    try {
      // Remove ".mdx" do nome do ficheiro para obter o id (slug)
      const slug = fileName.replace(/\.mdx$/, '');

      // Lê o ficheiro markdown como string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Usa gray-matter para analisar a secção de metadados do post (frontmatter)
      const matterResult = matter(fileContents);

      // Verifica se há dados válidos
      const title = matterResult.data.title || 'Título não disponível';
      const description = matterResult.data.description || 'Descrição não disponível';
      const date = matterResult.data.date || '2025-01-01';
      const imagem_destaque = matterResult.data.imagem_destaque || '';



      // Combina os dados com o slug
      return {
        slug,
        title,
        description,
        date,
        imagem_destaque,
      };
    } catch (error) {
      console.error(`Erro ao processar o ficheiro ${fileName}:`, error);
      return null;
    }
  }).filter((post): post is NonNullable<typeof post> => post !== null);

  // Ordena os posts por data (mais recentes primeiro)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
} 