
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables manually since we might not have dotenv configured for ts-node in this project context easily
// We will try to read .env.local if available
let SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
let SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
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
                    if (key === 'SUPABASE_SERVICE_ROLE') SUPABASE_SERVICE_ROLE = value;
                }
            });
        }
    } catch (e) {
        console.error('Error reading .env.local:', e);
    }
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE not found in environment or .env.local');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    auth: { persistSession: false }
});

const generateSlug = (title) => {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '');
};

const main = async () => {
    // Blog Post Data
    const title = "Água da Torneira em 2026: O Que a Sua Empresa Precisa de Saber Sobre o Decreto-Lei 69/2023";
    const slug = generateSlug("agua-torneira-2026-decreto-lei-69-2023"); // Manually refined slug
    const excerpt = "A sua empresa está preparada para os novos controlos de PFAS e Legionella? O prazo de 12 de janeiro de 2026 está a chegar. Saiba o que muda com o Decreto-Lei 69/2023 e como garantir a conformidade.";
    const meta_title = "Decreto-Lei 69/2023: Guia para Empresas e Instalações Prioritárias";
    const meta_description = "Tudo sobre o Decreto-Lei 69/2023: novos parâmetros (PFAS, BPA), avaliação de risco em edifícios prioritários e prazos de 2026. Garanta a segurança da água na sua empresa.";
    const imagem_destaque = "/logomedisigma.svg"; // Fallback as the suggested image might not exist yet
    const tags = ["Legislação", "Segurança no Trabalho", "Água Potável", "Legionella", "PFAS"];

    // Markdown content (stripping the frontmatter from the draft)
    const content_mdx = `A qualidade da água que consumimos nunca foi tão escrutinada como agora. Se gere um hotel, um ginásio ou uma escola, as regras do jogo mudaram — e os prazos estão mais apertados do que nunca.

O **[Decreto-Lei n.º 69/2023](https://diariodarepublica.pt/dr/detalhe/decreto-lei/69-2023-220113533)** trouxe uma revolução silenciosa à gestão da água em Portugal, transpondo diretivas europeias que exigem uma abordagem preventiva. Já não basta reagir a problemas; é preciso antecipá-los.

Com o prazo crítico de **12 de janeiro de 2026** à porta para novos parâmetros químicos, explicamos tudo o que a sua empresa precisa de fazer para estar em conformidade.

## O Que Muda: Do Controlo à Prevenção

A grande novidade deste diploma é a **Avaliação e Gestão de Risco**. Esqueça a ideia de apenas "analisar a água". O foco agora está em identificar perigos em toda a cadeia, desde a origem até à torneira do consumidor.

Para as empresas, isto significa que a responsabilidade não termina no contador. Se a qualidade da água se deteriorar dentro das suas instalações devido a canalizações antigas ou falta de manutenção, a responsabilidade é sua.

## A Sua Empresa é Uma "Instalação Prioritária"?

O novo decreto introduz o conceito rigoroso de **Instalações Prioritárias**. Se o seu edifício se enquadra nesta categoria, tem novas obrigações legais de monitorização e avaliação de risco.

**Quem é afetado?**
*   **Hospitais e Clínicas** (> 100 camas)
*   **Hotéis e Alojamentos Turísticos** (> 250 camas)
*   **Escolas e Creches**
*   **Lares de Idosos**
*   **Instalações Desportivas (Ginásios com balneários)**
*   **Estabelecimentos Prisionais**

### O Que Tem de Fazer?
Se gere uma destas instalações, deve realizar uma **Avaliação de Risco** documentada. Isto inclui verificar materiais inadequados (como o chumbo), pontos de estagnação e garantir temperaturas adequadas para prevenir a **[*Legionella*](https://www.smasalmada.pt/documents/37629/764195/preven%C3%A3%C2%A7%C3%A3%C2%A3o%2Be%2Bcontrolo%2Bde%2Blegionella%2Bnos%2Bsistemas%2Bde%2B%C3%A3%C2%81gua.pdf/88869b15-2975-a583-42a3-07a25492e2a6?t=1640729633603)**.

> **Atenção:** A monitorização de *Legionella* e Chumbo é agora obrigatória nestes edifícios, com ações corretivas imediatas em caso de incumprimento.

## Novos "Inimigos": PFAS e Bisfenol A

A ciência evoluiu e a lei acompanhou. A partir de **12 de janeiro de 2026**, entram em vigor limites rigorosos para substâncias que antes não eram controladas:

1.  **PFAS ("Químicos Eternos"):** Compostos usados em antiaderentes e impermeabilizantes, agora limitados a 0,10 µg/l (Soma) e 0,50 µg/l (Total).
2.  **Bisfenol A (BPA):** Um desregulador endócrino comum em plásticos, com limite de 2,5 µg/l.
3.  **Urânio e Ácidos Haloacéticos.**

A sua empresa deve garantir que os materiais em contacto com a água não estão a libertar estas substâncias. Isto é especialmente crítico se tiver depósitos ou tubagens antigas.

## Materiais em Contacto com a Água: O Novo Símbolo

Vai fazer obras ou renovar as canalizações? Esteja atento.
O **[Regulamento n.º 976/2025](https://diariodarepublica.pt/dr/detalhe/regulamento/976-2025-928163013)** da ERSAR harmoniza a aprovação de materiais. A partir do final de 2026, só poderão ser instalados produtos com a marcação de conformidade da UE e a indicação **"ADEQUADO PARA ÁGUA POTÁVEL"**.

Recuse materiais sem esta certificação. Usar torneiras ou tubos não conformes pode contaminar a sua água com chumbo ou níquel, colocando em risco a saúde dos utilizadores e a reputação do seu negócio.

## Checklist de Ação para Gestores

Para garantir que a sua empresa navega estas mudanças sem sobressaltos, siga estes passos:

1.  **Verifique a Classificação:** Confirme se o seu edifício é uma "Instalação Prioritária".
2.  **Agende Análises:** Se não o fez recentemente, peça análises à *Legionella* e ao Chumbo na torneira.
3.  **Audite a Rede Predial:** Identifique tubagens antigas (chumbo/ferro) e pontos mortos onde a água estagna.
4.  **Comunique:** Mantenha os registos de limpeza e manutenção organizados. A transparência é a nova norma.

## Conclusão

O Decreto-Lei 69/2023 não é apenas burocracia; é um passo gigante para a saúde pública em Portugal. Para as empresas, representa um desafio de adaptação, mas também uma oportunidade de demonstrar compromisso com a segurança e o bem-estar dos seus clientes e colaboradores.

Tem dúvidas sobre como implementar o Plano de Segurança da Água na sua instalação? A **Medisigma** pode ajudar na avaliação de risco e garantir que a sua empresa cumpre todas as novas exigências legais.

---
*Fonte: [Decreto-Lei n.º 69/2023](https://diariodarepublica.pt/dr/detalhe/decreto-lei/69-2023-220113533), [ERSAR](https://www.ersar.pt/pt/site-comunicacao/site-noticias/Paginas/Publica%C3%A7%C3%A3o-do-Regulamento-do-sistema-nacional-de-aprova%C3%A7%C3%A3o-dos-produtos-em-contacto-com-a-%C3%A1gua-destinada-ao-consumo-humano.aspx).*
`;

    console.log('Inserting post...');

    try {
        // 1. Insert Post
        const { data: post, error: postError } = await supabase
            .schema('web')
            .from('posts')
            .insert({
                title,
                slug,
                content_mdx,
                excerpt,
                meta_title,
                meta_description,
                imagem_destaque,
                status: 'published',
                published_at: new Date().toISOString(),
                content_rich: {}, // placeholder
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (postError) {
            // If slug exists, try appending a random number
            if (postError.code === '23505') { // Unique violation
                console.log('Slug already exists, trying again with suffix...');
                const { data: retryPost, error: retryError } = await supabase
                    .schema('web')
                    .from('posts')
                    .insert({
                        title,
                        slug: slug + '-' + Math.floor(Math.random() * 1000),
                        content_mdx,
                        excerpt,
                        meta_title,
                        meta_description,
                        imagem_destaque,
                        status: 'published',
                        published_at: new Date().toISOString(),
                        content_rich: {},
                        updated_at: new Date().toISOString()
                    })
                    .select()
                    .single();

                if (retryError) throw retryError;
                console.log('Post created successfully with new slug:', retryPost.slug);
                return handleTags(retryPost.id, tags, supabase);
            }
            throw postError;
        }

        console.log('Post created successfully:', post.slug);
        await handleTags(post.id, tags, supabase);

    } catch (e) {
        console.error('Failed to create post:', e);
    }
};

async function handleTags(postId, tagNames, supabase) {
    for (const name of tagNames) {
        // Get or create tag
        let { data: tag, error } = await supabase.schema('web').from('tags').select('id').eq('name', name).single();

        if (!tag) {
            const { data: newTag, error: createError } = await supabase.schema('web').from('tags').insert({ name }).select().single();
            if (createError) {
                console.error('Error creating tag:', name, createError);
                continue;
            }
            tag = newTag;
        }

        // Associate
        const { error: assocError } = await supabase.schema('web').from('post_tags').insert({ post_id: postId, tag_id: tag.id });
        if (assocError) {
            console.error('Error associating tag:', name, assocError);
        }
    }
    console.log('Tags processed.');
}

main();
