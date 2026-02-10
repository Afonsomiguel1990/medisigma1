/**
 * Script de Migração de Posts MDX para Base de Dados Supabase
 * 
 * Este script lê os posts melhorados da pasta blog-improved e insere-os
 * na tabela web.posts do Supabase.
 * 
 * Uso: npx ts-node scripts/migrate-posts.ts
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';

// Carregar variáveis de ambiente manualmente
const loadEnv = () => {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim().replace(/^["']|["']$/g, '');
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      });
      console.log('✅ Carregadas variáveis de .env.local');
    }
  } catch (e) {
    console.error('Erro ao ler .env.local', e);
  }
};

loadEnv();


// Configuração Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Erro: Variáveis de ambiente não configuradas');
  console.error('Certifique-se que NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE estão definidas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const postsDirectory = path.join(process.cwd(), 'src/content/blog-improved');

interface PostFrontmatter {
  title: string;
  date: string;
  description?: string;
  author?: string;
  imagem_destaque?: string;
  meta_title?: string;
  meta_description?: string;
}

async function migratePost(filename: string): Promise<boolean> {
  try {
    console.log(`\n📝 A processar: ${filename}`);

    // Ler ficheiro
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter e conteúdo
    const { data, content } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    // Gerar slug a partir do nome do ficheiro
    const slug = filename.replace(/\.mdx?$/, '');

    // Gerar excerpt a partir do conteúdo (primeiros 200 caracteres)
    const cleanContent = content
      .replace(/^---[\s\S]*?---/, '')
      .replace(/^#{1,6}\s+.*$/gm, '')
      .replace(/<[^>]*>/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/\n\s*\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const excerpt = frontmatter.description ||
      (cleanContent.length > 200 ? cleanContent.substring(0, 200) + '...' : cleanContent);

    // Preparar dados para inserir
    const postData = {
      title: frontmatter.title,
      slug: slug,
      content_mdx: content,
      excerpt: excerpt,
      description: frontmatter.description,
      author: frontmatter.author || 'Equipa Medisigma',
      imagem_destaque: frontmatter.imagem_destaque,
      meta_title: frontmatter.meta_title || frontmatter.title,
      meta_description: frontmatter.meta_description || frontmatter.description,
      og_image: frontmatter.imagem_destaque,
      status: 'published',
      published_at: frontmatter.date || new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      content_rich: {}, // Placeholder para compatibilidade
    };

    console.log(`   Título: ${postData.title}`);
    console.log(`   Slug: ${postData.slug}`);
    console.log(`   Tamanho: ${content.length} caracteres`);

    // Verificar se o post já existe
    const { data: existing } = await supabase
      .schema('web')
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      console.log(`   ℹ️  Post já existe, a atualizar...`);

      const { error } = await supabase
        .schema('web')
        .from('posts')
        .update(postData)
        .eq('slug', slug);

      if (error) {
        console.error(`   ❌ Erro ao atualizar: ${error.message}`);
        return false;
      }

      console.log(`   ✅ Post atualizado com sucesso!`);
    } else {
      console.log(`   ➕ A criar novo post...`);

      const { error } = await supabase
        .schema('web')
        .from('posts')
        .insert(postData);

      if (error) {
        console.error(`   ❌ Erro ao criar: ${error.message}`);
        return false;
      }

      console.log(`   ✅ Post criado com sucesso!`);
    }

    return true;
  } catch (error) {
    console.error(`   ❌ Erro ao processar ${filename}:`, error);
    return false;
  }
}

async function main() {
  console.log('🚀 Iniciando migração de posts MDX para Supabase\n');
  console.log(`📂 Diretório: ${postsDirectory}\n`);

  // Verificar se a pasta existe
  if (!fs.existsSync(postsDirectory)) {
    console.error(`❌ Erro: Pasta ${postsDirectory} não encontrada`);
    process.exit(1);
  }

  // Ler ficheiros MDX
  const files = fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

  if (files.length === 0) {
    console.log('⚠️  Nenhum ficheiro MDX encontrado');
    process.exit(0);
  }

  console.log(`📋 Encontrados ${files.length} ficheiro(s) para migrar:\n`);
  files.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
  });

  console.log('\n' + '='.repeat(60) + '\n');

  // Migrar cada post
  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const success = await migratePost(file);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }

  // Resumo
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Resumo da Migração:\n');
  console.log(`   ✅ Sucesso: ${successCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
  console.log(`   📝 Total: ${files.length}`);

  if (errorCount > 0) {
    console.log('\n⚠️  Alguns posts não foram migrados com sucesso');
    console.log('   Verifique os erros acima para mais detalhes');
    process.exit(1);
  } else {
    console.log('\n🎉 Migração concluída com sucesso!');
    console.log('\n💡 Próximos passos:');
    console.log('   1. Verificar os posts na base de dados');
    console.log('   2. Testar o frontend em /blog');
    console.log('   3. Verificar a página de admin em /admin/blog');
    process.exit(0);
  }
}

// Executar
main().catch(error => {
  console.error('\n❌ Erro fatal:', error);
  process.exit(1);
});













