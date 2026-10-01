import nextEnv from '@next/env';
import { createClient } from '@supabase/supabase-js';
import { hasEmDash } from './check-public-copy.mjs';
nextEnv.loadEnvConfig(process.cwd());
const required = ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE', 'SLACK_WEBHOOK_URL', 'ADMIN_USERNAME', 'ADMIN_PASSWORD'];
const missing = required.filter(name => !process.env[name]);
if (missing.length) throw new Error(`Required server configuration missing: ${missing.join(', ')}`);
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE, { auth: { persistSession: false } });
const {error} = await client.schema('web').rpc('get_lead_analytics', {p_from:'2000-01-01T00:00:00Z',p_to:'2000-01-02T00:00:00Z'});
if (error) throw new Error('Private lead RPC is unavailable. Apply the reviewed migrations before publishing.');
const { error: contactError } = await client.schema('web').from('contacts').select('nome,localidade,tipo_instalacao,concelho,nif,numero_trabalhadores,numero_estabelecimentos,numero_extintores').limit(0);
if (contactError) throw new Error('Contact detail columns are unavailable. Apply contact-details.sql and proposal-details.sql before publishing.');
const { data: posts, error: copyError } = await client.schema('web').from('posts')
  .select('slug,title,excerpt,description,content_mdx,content_rich,author,meta_title,meta_description');
if (copyError) throw new Error('Could not verify blog punctuation before publishing.');
const invalidPosts = (posts || []).filter(post => hasEmDash(JSON.stringify(post)));
if (invalidPosts.length) throw new Error('M-dashes in blog content: ' + invalidPosts.map(post => post.slug).join(', '));
console.log('Blog punctuation verified in ' + (posts || []).length + ' articles and drafts.');
console.log('Server configuration and private lead RPC verified. No notifications sent.');
