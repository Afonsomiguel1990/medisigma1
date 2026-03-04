---
description: Como Publicar um Artigo no Blog da Medisigma
---

# Como Publicar um Artigo no Blog

O blog da Medisigma **não lê diretamente os ficheiros `.mdx` da pasta local**. Toda a informação do blog é dinâmica e vem da base de dados Supabase (projeto `SigmaMulti`), mais concretamente da tabela `web.posts`. 

Por isso, colocar um ficheiro na pasta `src/content/blog-improved` não o faz aparecer no site automaticamente.

Abaixo estão as duas formas corretas de publicar um artigo:

## Opção 1: Via Dashboard de Administração (Recomendado)

O site possui um sistema de backoffice preparado para a gestão de conteúdos do blog. Esta é a forma mais fácil e segura.

1. Navega para a área de administração local em `http://localhost:3000/admin/blog/new` (ou no servidor de produção equivalente).
2. Preenche os campos do formulário:
   - **Título**: O nome do artigo.
   - **Slug**: O caminho no URL (ex: `perigo-lagarta-do-pinheiro-caes`). Pode ser gerado automaticamente.
   - **Descrição (Excerpt)**: Pequeno resumo que aparece no cartão do blog.
   - **Imagem de Destaque**: O URL ou envio da fotografia de capa (ex: imagem do Unsplash).
   - **Autor**: "Equipa Medisigma" ou outro.
3. No campo de conteúdo (normalmente um editor de texto ou campo MDX), insere todo o texto estruturado do artigo.
4. Grava/Publica o Post. Este botão irá gravar os dados de forma correta e nativa na base de dados Supabase.
5. Abre `localhost:3000/blog` para confirmar que o artigo já aparece.

## Opção 2: Inserção Direta na Base de Dados (Para Developers / IA)

Se estiveres a pedir ao agente (como eu) para publicar o artigo, o processo tem de passar por uma _query SQL_ diretamente para o Supabase:

1. O agente de IA escreve e compõe o artigo com marcação Markdown (`.mdx`).
2. Usa-se a ferramenta de base de dados (`mcp_supabase-mcp-server_execute_sql`) para inserir uma nova linha na tabela `web.posts`.
3. Atenção à restrição de segurança (`NOT NULL` constraints):
   - A coluna `content_mdx` recebe o texto.
   - A coluna `content_rich` **tem de receber no mínimo um objeto JSON vazio** (ex: `'{}'::jsonb`) caso não se utilize um editor rich text por trás.
4. Após o script correr, a query grava o ficheiro em produção e ele torna-se instantaneamente disponível sem precisar de fazer `commit` ao código-fonte ou `deploy` do Next.js.
