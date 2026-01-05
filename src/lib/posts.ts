import { getSupabaseServer, getSupabaseAnon } from './supabase';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content_mdx: string | null;
  content_rich: Record<string, unknown> | null;
  excerpt: string | null;
  description: string | null;
  author: string | null;
  imagem_destaque: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  status: 'draft' | 'scheduled' | 'published';
  published_at: string | null;
  scheduled_for: string | null;
  created_at: string;
  updated_at: string;
  author_id: string | null;
}

export interface PostWithTags extends Post {
  tags?: { id: string; name: string }[];
}

export interface CreatePostData {
  title: string;
  slug: string;
  content_mdx: string;
  excerpt?: string;
  description?: string;
  author?: string;
  imagem_destaque?: string;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  status: 'draft' | 'scheduled' | 'published';
  published_at?: string;
  scheduled_for?: string;
  tags?: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}

/**
 * Obtém todos os posts publicados (público)
 */
export async function getAllPublishedPosts(): Promise<Post[]> {
  const supabase = getSupabaseAnon();

  const { data, error } = await supabase
    .schema('web')
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Erro ao obter posts publicados:', error);
    throw error;
  }

  return data as Post[];
}

/**
 * Obtém todos os posts (incluindo drafts) - apenas para utilizadores autenticados
 */
export async function getAllPosts(): Promise<Post[]> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .schema('web')
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao obter todos os posts:', error);
    throw error;
  }

  return data as Post[];
}

/**
 * Obtém um post pelo slug (público se publicado)
 */
export async function getPostBySlug(slug: string): Promise<PostWithTags | null> {
  const supabase = getSupabaseAnon();

  const { data: post, error: postError } = await supabase
    .schema('web')
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (postError) {
    if (postError.code !== 'PGRST116') {
      console.error('Erro ao obter post por slug:', postError);
    }
    return null;
  }

  // Obter tags associadas
  const { data: postTags, error: tagsError } = await supabase
    .schema('web')
    .from('post_tags')
    .select('tag_id, tags(id, name)')
    .eq('post_id', post.id);

  if (tagsError) {
    console.error('Erro ao obter tags do post:', tagsError);
  }

  type PostTagRecord = { tag_id: string; tags: { id: string; name: string } | { id: string; name: string }[] | null };
  const tags = postTags?.map((pt: PostTagRecord) => {
    if (Array.isArray(pt.tags)) return pt.tags[0];
    return pt.tags;
  }).filter((tag): tag is { id: string; name: string } => tag !== null && tag !== undefined) || [];

  return {
    ...post,
    tags,
  } as PostWithTags;
}

/**
 * Obtém um post pelo ID (autenticado)
 */
export async function getPostById(id: string): Promise<PostWithTags | null> {
  const supabase = getSupabaseServer();

  const { data: post, error: postError } = await supabase
    .schema('web')
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (postError) {
    console.error('Erro ao obter post por ID:', postError);
    return null;
  }

  // Obter tags associadas
  const { data: postTags, error: tagsError } = await supabase
    .schema('web')
    .from('post_tags')
    .select('tag_id, tags(id, name)')
    .eq('post_id', post.id);

  if (tagsError) {
    console.error('Erro ao obter tags do post:', tagsError);
  }

  type PostTagRecord = { tag_id: string; tags: { id: string; name: string } | { id: string; name: string }[] | null };
  const tags = postTags?.map((pt: PostTagRecord) => {
    if (Array.isArray(pt.tags)) return pt.tags[0];
    return pt.tags;
  }).filter((tag): tag is { id: string; name: string } => tag !== null && tag !== undefined) || [];

  return {
    ...post,
    tags,
  } as PostWithTags;
}

/**
 * Cria um novo post
 */
export async function createPost(data: CreatePostData): Promise<Post> {
  const supabase = getSupabaseServer();

  const { tags, ...postData } = data;

  // Criar o post
  const { data: post, error: postError } = await supabase
    .schema('web')
    .from('posts')
    .insert({
      ...postData,
      content_rich: {}, // Placeholder para compatibilidade
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (postError) {
    console.error('Erro ao criar post:', postError);
    throw postError;
  }

  // Associar tags se fornecidas
  if (tags && tags.length > 0) {
    await associateTags(post.id, tags);
  }

  return post as Post;
}

/**
 * Atualiza um post existente
 */
export async function updatePost(data: UpdatePostData): Promise<Post> {
  const supabase = getSupabaseServer();

  const { id, tags, ...postData } = data;

  // Atualizar o post
  const { data: post, error: postError } = await supabase
    .schema('web')
    .from('posts')
    .update({
      ...postData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (postError) {
    console.error('Erro ao atualizar post:', postError);
    throw postError;
  }

  // Atualizar tags se fornecidas
  if (tags !== undefined) {
    // Remover tags antigas
    await supabase
      .schema('web')
      .from('post_tags')
      .delete()
      .eq('post_id', id);

    // Adicionar novas tags
    if (tags.length > 0) {
      await associateTags(id, tags);
    }
  }

  return post as Post;
}

/**
 * Elimina um post
 */
export async function deletePost(id: string): Promise<void> {
  const supabase = getSupabaseServer();

  const { error } = await supabase
    .schema('web')
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao eliminar post:', error);
    throw error;
  }
}

/**
 * Publica um post (altera status para published)
 */
export async function publishPost(id: string, publishedAt?: string): Promise<Post> {
  const supabase = getSupabaseServer();

  const { data: post, error } = await supabase
    .schema('web')
    .from('posts')
    .update({
      status: 'published',
      published_at: publishedAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao publicar post:', error);
    throw error;
  }

  return post as Post;
}

/**
 * Agenda um post para publicação futura
 */
export async function schedulePost(id: string, scheduledFor: string): Promise<Post> {
  const supabase = getSupabaseServer();

  const { data: post, error } = await supabase
    .schema('web')
    .from('posts')
    .update({
      status: 'scheduled',
      scheduled_for: scheduledFor,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao agendar post:', error);
    throw error;
  }

  return post as Post;
}

/**
 * Obtém todas as tags
 */
export async function getAllTags(): Promise<{ id: string; name: string }[]> {
  const supabase = getSupabaseAnon();

  const { data, error } = await supabase
    .schema('web')
    .from('tags')
    .select('id, name')
    .order('name');

  if (error) {
    console.error('Erro ao obter tags:', error);
    throw error;
  }

  return data;
}

/**
 * Cria uma nova tag ou retorna existente
 */
export async function createOrGetTag(name: string): Promise<{ id: string; name: string }> {
  const supabase = getSupabaseServer();

  // Tentar obter tag existente
  const { data: existing } = await supabase
    .schema('web')
    .from('tags')
    .select('id, name')
    .eq('name', name)
    .single();

  if (existing) {
    return existing;
  }

  // Criar nova tag
  const { data: newTag, error } = await supabase
    .schema('web')
    .from('tags')
    .insert({ name })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar tag:', error);
    throw error;
  }

  return newTag;
}

/**
 * Associa tags a um post (helper interno)
 */
async function associateTags(postId: string, tagNames: string[]): Promise<void> {
  const supabase = getSupabaseServer();

  // Criar ou obter tags
  const tagPromises = tagNames.map(name => createOrGetTag(name));
  const tags = await Promise.all(tagPromises);

  // Criar associações
  const associations = tags.map(tag => ({
    post_id: postId,
    tag_id: tag.id,
  }));

  const { error } = await supabase
    .schema('web')
    .from('post_tags')
    .insert(associations);

  if (error) {
    console.error('Erro ao associar tags:', error);
    throw error;
  }
}

/**
 * Gera um slug único baseado no título
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/--+/g, '-') // Remove hífens duplicados
    .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim
}

/**
 * Valida se um slug é único
 */
export async function isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = getSupabaseAnon();

  let query = supabase
    .schema('web')
    .from('posts')
    .select('id')
    .eq('slug', slug);

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Erro ao verificar unicidade do slug:', error);
    return false;
  }

  return data.length === 0;
}

