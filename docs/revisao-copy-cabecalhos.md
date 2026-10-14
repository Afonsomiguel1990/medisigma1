# Revisão de texto e imagens dos serviços

## Direção

Correção pedida pelo utilizador a 14 de outubro de 2026. Texto direto e persuasivo, com uma ideia a conduzir à seguinte, começando pela dúvida do visitante e terminando no contacto. Sem promessas de resultados, urgência inventada, testemunhos novos ou notas editoriais no site.

Aplicada a skill antislop-copywriting, instalada em C:/Users/Afons/.codex/skills/antislop-copywriting, e lido o core antislop. O comando skills use solicitado foi executado e o resultado completo ficou em output/copy-refresh/antislop-skill-output.txt. Não foram acrescentadas instruções ao AGENTS.md.

Direção visual: páginas comerciais Medisigma, com imagens do serviço e texto legível para responsáveis de empresas. Energia 2, ritmo 2, movimento 1. Mantêm-se a tipografia e o azul da marca; a fotografia dá contexto e os fundos claros separam os conteúdos. O cabeçalho junta texto e imagem no computador e empilha os elementos no telemóvel. As imagens têm espaço reservado e carregamento prioritário. Os setores usam linhas por serviço para comparar necessidades sem repetir caixas.

## Alterações

- Cabeçalhos com imagens nos três serviços novos, em Legionella e nos dois setores.
- Abertura de radão explica o gás e a medição antes de pedir informação sobre o edifício.
- Convites ao contacto próprios para cada serviço e setor.
- Retiradas as notas sobre campos obrigatórios e autoria editorial; removidos os blocos de ressalvas repetidos. As diferenças de âmbito que ajudam a contratar ficaram nas perguntas frequentes.
- Removido o microtexto sobre campos obrigatórios na página de proposta e duas frases sobre a própria página nas localidades.
- Os formulários, consentimento, categorias e receção de pedidos mantêm os mecanismos já publicados.

## Fontes e imagens

Definição de radão confirmada na APA: https://apambiente.pt/prevencao-e-gestao-de-riscos/radao

Fotos existentes da Medisigma: avaliação de ruído na Sofalca para ruído e indústria; acompanhamento da Herdade Amarela para hotelaria. O local real consta dos textos do caso e das descrições das imagens. Legionella reutiliza a imagem existente de recolha de amostra.

As duas imagens novas são ilustrações conceptuais, geradas com a ferramenta imagegen integrada, sem pessoas, marcas ou resultados de medições. Os textos alternativos identificam-nas como ilustrações. Não representam intervenções reais da empresa.

- public/images/servicos/radao-edificio.webp, 1440 × 1080
- public/images/servicos/qualidade-ar-interior.webp, 1440 × 1080

### Prompts utilizados

#### radao

Create a polished editorial architectural illustration for the header of a Portuguese workplace radon measurement service webpage. Landscape 4:3 composition. A precise axonometric cutaway of a small contemporary Portuguese office building, showing one ground-floor occupied office and a modest basement, with a cut section of earth and natural granite below the foundations. Show a few subtle warm amber translucent rising paths from the soil through tiny foundation openings into interior space, making this unmistakably a conceptual explanation of invisible radon movement, not a literal photograph of gas. Balanced, calm, sophisticated architectural miniature with tactile off-white plaster, stone, deep blue and small sage-green accents. Natural warm daylight, crisp realistic materials but clearly illustrative cutaway. Strong central focal point with meaningful detail at phone size, no crowded objects. No people, no faces, no company logos, no radiation warning signs, no skulls, no scary glow, no charts, no invented instrument displays, no text, letters, numbers, captions or watermarks. Suitable for a credible occupational health company, visually rich and appealing, not a flat icon or generic blob illustration.

#### ar-interior

Create a high quality editorial architectural visualization for the header of a Portuguese indoor air quality assessment service webpage. Landscape 4:3. A calm, sunlit contemporary workplace meeting room with limewashed warm white walls, light oak table, a few dark blue chairs, tall windows, subtle ceiling ventilation grilles. Main visual is the real spatial relationship between the room, the air supply grilles and occupied workspace. Use very subtle translucent pale-blue flowing ribbons through the upper part of the room as an unmistakably conceptual architectural rendering of air circulation, not a photograph of real pollution. Refined material textures, restrained blue and sage palette, soft natural shadows, uncluttered, trustworthy professional aesthetic, high-end editorial art direction. No people, no logos, no text, no labels, no lettering or numbers, no watermarks, no fake meters or measurement results, no green health aura, no fog or visible pollutants. This is an original illustrative image, not evidence of work carried out by any company.

## Verificação

Build e verificação de tipos concluídos. Os 82 testes existentes passaram. Foram verificados 82 URLs em HTML e Markdown, 19 páginas com canónicas e sitemap, seis redirecionamentos e 20 páginas com media. O único aviso do build continua a ser o import Link sem uso na página de segurança contra incêndios, anterior a esta revisão.

No browser integrado, as seis páginas passaram a 320, 390, 820 e 1280 píxeis. Sem transbordo horizontal, um H1 e uma imagem no cabeçalho de cada página. As imagens que ainda carregavam na primeira leitura foram novamente observadas e todas concluíram o carregamento. As capturas estão em output/copy-refresh/. O formulário vazio foi bloqueado pelos campos empresa, email e serviço; não houve submissões reais.

Percursos observados: o botão de cada serviço abre pedir-proposta com a categoria correspondente; os dois setores abrem o pedido geral; as perguntas e transcrições abrem com Enter; o menu móvel abre e fecha. Não foram observados erros na consola.

### Verificação da skill

Âmbito: texto, cabeçalhos e percursos alterados nesta revisão. A interface comum existente mantém-se.

- R-02 PASS: revisão do texto e verificador de cópia sem m-dashes nas páginas públicas.
- R-03 PASS: 24 combinações de página e largura verificadas; os CTAs novos têm altura mínima de 48 píxeis.
- R-17, R-18, R-36 e C-5 PASS: sem estatísticas, testemunhos, certificações ou resultados novos inventados.
- R-23, R-38 PASS: imagens pedidas pelo utilizador; fotos existentes mantêm a localização real; imagens geradas identificadas como ilustrações no texto alternativo e documentadas aqui.
- R-24, R-26 e C-2 PASS: destinos existentes e seis CTAs percorridos até ao formulário; categorias confirmadas no browser.
- R-25 PASS: texto branco sobre o azul da marca com contraste 5,25:1; texto do cabeçalho sobre o fundo com 9,42:1. Sem texto sobre fotografias.
- R-27 PASS: estados e mensagens do formulário preservados; validação vazia observada e testes de receção aprovados.
- R-28 PASS: perguntas específicas de medição, duração, condições de trabalho e serviços abrangidos.
- R-32 PASS: perguntas abertas com Enter, ligações nativas e foco visível nos CTAs e resumos alterados.
- R-33 PASS: implementação nos componentes e dados de origem. Sem scripts de alteração de CSS na aplicação.
- R-34 PASS: mantém o tema claro da marca e o comportamento de tema existente; não acrescenta um seletor de tema.
- R-35 e C-4 PASS: build, testes, navegação, validação de formulário e inspeção visual registados acima.
- R-37 PASS: direção aprovada pela identidade Medisigma e pelos comentários do utilizador; energia 2, ritmo 2 e movimento 1.
- Purpose Gate PASS: cores e fonte da marca; imagens explicam o serviço; fundo separa o contacto; sem novos ícones, brilhos, badges ou animações decorativas.
- Liveliness PASS: imagem como foco do cabeçalho, hierarquia de texto e variação entre explicação, resultados, dúvidas, prova real e contacto.
- C-1, C-3, R-05, R-11, R-15, R-16, R-20, R-21, R-29, R-30, R-31 PASS: decisões justificadas na direção; botões dizem a ação; conteúdo próprio por serviço; estrutura e cores mantêm a identidade da Medisigma.

Skill consultada na versão 3.2.20, commit b1cdf87d49b1653293d58424516fd80394008345. O relatório de revisão é um ficheiro do projeto, não conteúdo das páginas comerciais.

