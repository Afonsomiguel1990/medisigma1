---
name: medisigma-blog-article
description: Create, revise, publish, or update Medisigma blog articles in pt-PT. Use when asked to write an SEO article for the Medisigma blog, adapt competitor/example articles into a new Medisigma article, publish a post to the Medisigma blog, fix formatting/links/CTA in an existing post, choose or replace a featured image, or update related discovery assets such as llms.txt and blog cache behavior. This skill is specific to the Medisigma project, where blog content lives in Supabase web.posts rather than local .mdx files.
---

# Medisigma Blog Article

Treat the blog as a database-backed system, not a content-folder workflow.

## Core Rule

The Medisigma blog does **not** publish from local `.mdx` files.

The source of truth is Supabase, schema `web`, table `posts`.

If needed, read these project files:

- `.agents/workflows/como-publicar-no-blog.md`
- `src/lib/posts.ts`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/sitemap.ts`
- `public/llms.txt`

## Write the Article

Write in **pt-PT**.

Avoid:

- em dashes
- Brazilian Portuguese phrasing
- robotic or overly polished AI tone
- long walls of text

Use this editorial standard:

- open with a direct, concrete introduction
- make the first 150 words answer the topic clearly
- keep paragraphs short, usually 2 to 4 sentences
- add a blank line whenever the text starts to look dense, roughly every 3 to 4 visual lines
- include one H1-equivalent title in the post title, not repeated in the body
- include useful section headings, FAQ, CTA, and sources
- prefer practical language aimed at Portuguese employers, managers, HR, HST, or operations teams

Before finalizing, do a human-sounding pass:

- remove generic transitions
- vary sentence length
- replace abstract phrasing with concrete wording
- ask whether the text sounds AI-generated; if yes, rewrite until the answer is no

## SEO Rules

Always prepare:

- `title`
- `slug`
- `excerpt`
- `description`
- `meta_title`
- `meta_description`
- `imagem_destaque`
- `og_image`

Default author:

- `Equipa Medisigma`

SEO expectations:

- put the main keyword naturally in title, intro, one or more H2s, and conclusion
- use a clean slug with lowercase and hyphens
- add internal links to relevant Medisigma pages or posts
- add external links to authoritative sources inside the article body, not only in the source list
- include a FAQ section for long-tail queries
- include a CTA section near the end
- **Beware of generic keywords** in the article text (like "água") that might accidentally trigger the wrong CTA logic (e.g., Legionella instead of Segurança Alimentar). Check the `serviceKeywords` array in `src/app/blog/[slug]/page.tsx` if CTAs render incorrectly.

## Research Workflow

When the user gives example articles or asks for a high-quality SEO article:

1. Analyze the examples to identify angle, search intent, and what is missing.
2. Support factual claims with strong sources.
3. Prefer official, academic, or primary sources when making claims about studies, law, or public data.
4. Keep the final article adapted to Medisigma's voice and audience, not as a paraphrase of competitor content.

## Formatting Rules for This Blog

The current renderer is tolerant of Markdown, but some structures are safer in HTML.

Prefer:

- normal Markdown for headings, paragraphs, and inline links
- HTML `<ul>` and `<li>` when list rendering needs to be reliable
- HTML `<table>` when table rendering needs to be reliable
- occasional `<br />` to create breathing room when the article still looks visually dense

Do not assume that Markdown tables will always render well.

If preview shows dense blocks or malformed lists/tables, convert those sections to HTML.

## Featured Image Rules

If using a featured image:

- **DO NOT use direct Unsplash URLs** (`https://images.unsplash.com/...`) in `imagem_destaque`. The Next.js image optimizer on Vercel is blocked by Unsplash (403 Forbidden).
- ALWAYS download or generate the image locally.
- Save the local image to `public/blog/` (e.g., `public/blog/my-image.png`).
- Reference it with a relative path (e.g., `imagem_destaque: '/blog/my-image.png'`).
- choose an image that matches the topic
- avoid visible text inside the image
- avoid images that look like screenshots, documents, or dashboards

Keep `imagem_destaque` and `og_image` aligned unless there is a specific reason not to.

## Publish the Article

Use the app/admin flow if it is available and properly configured.

If not, publish directly via Supabase.

When inserting or updating via SQL, remember:

- `content_rich` is required and should usually be `'{}'::jsonb`
- `content_mdx` stores the article body
- `status` must be one of `draft`, `scheduled`, or `published`
- `published_at` should be set when publishing immediately

Minimum safe insert set:

- `title`
- `slug`
- `content_rich`
- `content_mdx`
- `status`

Usual production insert set:

- `title`
- `slug`
- `content_rich`
- `content_mdx`
- `excerpt`
- `description`
- `author`
- `imagem_destaque`
- `meta_title`
- `meta_description`
- `og_image`
- `status`
- `published_at` when applicable

Default publishing approach:

- create as `draft` unless the user clearly asks to publish now

## Important Environment Note

The local admin/backoffice may not show drafts if `SUPABASE_SERVICE_ROLE` is missing.

Why:

- the project falls back to the anon key
- RLS allows `public` to read only published posts

So:

- if the post is in `draft`, it may exist in Supabase and still not appear in local admin
- publishing it makes it visible to the anon path

## After Publish or Update

Always check:

- article page rendering
- featured image
- paragraph spacing
- lists and tables
- internal links
- external links
- CTA presence
- metadata fields

If the article was inserted directly in the database, remember that content does **not** require git by itself.

Git is only needed when you change repository files, such as:

- `public/llms.txt`
- cache behavior in `src/app/blog/page.tsx`
- cache behavior in `src/app/sitemap.ts`
- API routes that revalidate paths

## Production Sync Rules

If the website is on Vercel and the article is already in the same Supabase project but does not show up:

1. Check whether the issue is content or cache.
2. If `/blog` is stale, make sure the blog listing is dynamic or properly revalidated.
3. If publishing through the app API, make sure publish routes call `revalidatePath` for:
   - `/blog`
   - `/blog/[slug]`
   - `/`
4. Update `public/llms.txt` when the new article should be reflected there.
5. Commit and push only when repository files changed.

## Final Checklist

Before finishing, verify:

- the article is in pt-PT
- the article does not sound AI-generated
- paragraphs have enough breathing room
- there is at least one CTA
- there are internal and external links
- the image is relevant and has no visible text
- metadata is filled
- the publish status matches the user request
- if repo files changed, they are committed cleanly
