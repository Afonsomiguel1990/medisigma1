import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

// Define o caminho para a pasta de conteúdo do blog
const postsDirectory = path.join(process.cwd(), 'src/content/blog');

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

    // Combina os dados com o slug
    return {
      slug,
      ...(matterResult.data as { date: string; title: string }), // Adiciona tipagem para o frontmatter esperado
    };
  });

  // Ordena os posts por data (mais recentes primeiro)
  return allPostsData.sort((a, b) => {
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