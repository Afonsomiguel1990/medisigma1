
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
let SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
let SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            envContent.split('\n').forEach(line => {
                const match = line.match(/^([^=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                    const value = match[2].trim().replace(/^["']|["']$/g, '');
                    if (key === 'NEXT_PUBLIC_SUPABASE_URL') SUPABASE_URL = value;
                    if (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') SUPABASE_ANON_KEY = value;
                }
            });
        }
    } catch (e) {
        console.error('Error reading .env.local:', e);
    }
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const main = async () => {
    console.log('Checking posts...');

    // Simulate getAllPublishedPosts
    const { data: posts, error } = await supabase
        .schema('web')
        .from('posts')
        .select('id, title, slug, status, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    console.log(`Found ${posts.length} published posts.`);

    const targetSlug = 'agua-torneira-2026-decreto-lei-69-2023';
    const found = posts.find(p => p.slug === targetSlug);

    if (found) {
        console.log('Target post FOUND in query list:');
        console.log(found);
    } else {
        console.log('Target post NOT FOUND in query list.');
        console.log('Top 5 posts found:');
        posts.slice(0, 5).forEach(p => console.log(`- ${p.title} (${p.slug}) [${p.status}]`));
    }

    // Check specific post directly
    const { data: directPost } = await supabase.schema('web').from('posts').select('*').eq('slug', targetSlug).single();
    if (directPost) {
        console.log('\nDirect check by slug:', directPost.slug);
        console.log('Status:', directPost.status);
    } else {
        console.log('\nDirect check by slug returned null.');
    }
};

main();
