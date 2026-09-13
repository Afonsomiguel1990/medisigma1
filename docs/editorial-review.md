# Revisão editorial e recursos

14 setembro 2026. Alterações locais, sem publicação ou CMS.

Foram feitas 67 substituições localizadas em Medicina do Trabalho, Legionella, Segurança no Trabalho e Lisboa, Santarém, Abrantes, Tomar, Torres Novas, Entroncamento e Rio Maior. O registo antes/depois está em resources/qc/editorial-changes.json. Preservaram-se classes, imagens, menus e ordem dos blocos.

Medicina do Trabalho passa a relacionar os exames com tarefas, riscos e indicação clínica. Sai a promessa de resposta em 24 horas e o pacote universal de exames complementares. Legionella distingue plano e programa de manutenção conforme a instalação; texto e FAQ JSON-LD deixam de apresentar periodicidades universais, um limiar geral de intervenção ou acreditação não demonstrada. SST explica prioridades, responsáveis e acompanhamento. As páginas locais deixam de prometer aprovação pela ANEPC, ausência de coimas ou certificações genéricas.

## Fontes consultadas

- [DGS: vigilância da saúde](https://www.dgs.pt/saude-ocupacional/organizacao-de-servicos-de-saude-do-trabalho/requisitos-de-organizacao-e-funcionamento/atividades/vigilancia-da-saude.aspx), exames e decisão clínica.
- [DR: artigo 110.º da Lei 102/2009](https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-56365341-56371601), ficha de aptidão e segredo profissional.
- [DR: Lei 52/2018](https://diariodarepublica.pt/dr/detalhe/lei/52-2018-116108098) e [Portaria 25/2021](https://diariodarepublica.pt/dr/detalhe/portaria/25-2021-155732599), âmbito e gestão do risco de Legionella.
- [gov.pt: SST](https://www.gov.pt/guias/seguranca-e-saude-no-trabalho-em-portugal) e [ACT/DGS: referência de licenciamento industrial](https://www.dgs.pt/saude-ocupacional/documentos-so/dgs-act-doc-sir-pdf.aspx), organização e avaliação de riscos. O referencial industrial não é apresentado como lista universal para inspeções.
- [DR: formação contínua](https://diariodarepublica.pt/dr/lexionario/termo/dever-formacao-continua-direito-trabalho), contexto dos objetivos e situações proporcionais. A matriz não fixa horas por defeito.
- [DGS: Informação Técnica 01/2010, atualizada em 26/11/2021](https://www.dgs.pt/saude-ocupacional/referenciais-tecnicos-e-normativos/informacoes-tecnicas/informacao-tecnica-n-12010-primeiros-socorros-no-local-de-trabalho-pdf.aspx). O inventário é explicitamente uma seleção parcial não medicamentosa, adaptável pelo serviço ST/SO.
- [ANEPC: medidas de autoproteção](https://prociv.gov.pt/pt/seguranca-contra-incendio/servicos/medidas-autoprotecao-edificios/), responsabilidades e âmbito. O registo não define periodicidades universais.

O portal ACT devolveu 502 numa tentativa. Não foi citada como lida uma nota técnica de 2026 encontrada apenas numa referência secundária.

## Recursos e verificação

Seis ficheiros locais em resources/files: preparacao-exames.pdf, dossier-legionella.pdf, preparacao-act.pdf, matriz-formacao.xlsx, inventario-primeiros-socorros.xlsx e controlo-incendios.xlsx. Fontes e gerador em resources/source; manifesto SHA-256 em resources/qc/manifest.json. Todo resources fica fora do repositório público.

Os três PDFs têm duas páginas cada, todas renderizadas com Poppler e inspecionadas sem cortes ou sobreposições. Incluem fontes clicáveis, responsáveis, estados e ações. Os XLSX foram reabertos com openpyxl; folhas, filtros, painéis e fórmulas verificados. Previews visuais gerados das células reais foram inspecionados, mas não são renderizações nativas do Excel. A fórmula de formação deixa branco quando falta um input e calcula MAX(0,objetivo-realizadas). A recalculação nativa ao abrir em Excel ainda não foi verificada.

Os modelos não recolhem diagnósticos, não certificam conformidade e não substituem avaliação técnica. Não foram incluídos dados fictícios como resultados reais. tsc --noEmit e git diff --check passaram após a revisão.

## Revisão adicional identificada

Coimbra, Castelo Branco, Covilhã, Leiria, Fátima e Portalegre foram inspecionadas para alegações e formulações problemáticas. Exigem revisão localizada adicional, incluindo certificações e texto pouco claro. Depoimentos, moradas, cobertura e relações comerciais existentes não foram validados nesta frente. Não usar estas páginas como prova de presença física ou de autorização.

## Propostas pontuais para o CMS

O snapshot read-only atual contém 27 artigos publicados. Foram triados todos os textos e metadados; a verificação de fontes foi focada nos prioritários e não constitui auditoria técnica de cada alegação dos 27 artigos.

Quatro propostas, sem aplicação, constam de output/cms-editorial-proposals.json. Cada entrada contém identificação, updated_at esperado, hash do conteúdo original, campo novo e operações exatas. O ficheiro e o snapshot ficam fora do Git público.

- Kit: corrigir a lista atribuída à DGS para os 11 grupos do documento2021, distinguindo os dois materiais desejáveis; retirar a afirmação absoluta de ausência de medicamentos porque a fonte inclui soluções antissépticas.
- Exames e extintores: mantêm-se os conteúdos CMS. A correção das tabelas é feita no renderizador com remarkGfm, incluindo os restantes artigos com tabelas.
- Simulacros: remover a aproximação anual/bianual sem enquadramento do edifício.
- Legionella: distinguir plano de prevenção de programa de manutenção e ajustar a checklist.
- Água: remover uma frase interna sobre como outros artigos deveriam ser atualizados; sem acrescentar regras legais.

Formação e ACT já têm enquadramento prudente no snapshot. As ligações aos recursos são tratadas pelo template do blog, evitando duplicação de chamadas dentro dos artigos. Metadados CMS de simulacros e extintores já diferem dos títulos antigos observados no HTML de13set; a discrepância deve ser resolvida no template/cache, sem impor outra reescrita no CMS.

Os quatro conteúdos propostos passaram compilação MDX local. O inventário de primeiros socorros é explicitamente uma seleção parcial não medicamentosa, não uma reprodução integral DGS; não apresenta antissépticos como proibidos.

## Segunda revisão localizada concluída

Foram revistas Coimbra, Castelo Branco, Covilhã, Fátima, Leiria e Portalegre, além de Formação, Manutenção de Extintores e Segurança Contra Incêndios. A revisão fez 68 substituições de texto nos blocos existentes, sem alterar cores, classes de layout, imagens, ordem ou menus. O registo exato encontra-se em resources/qc/editorial-phase2.json, mantido fora do Git público.

Foram corrigidas alegações de ausência de risco, prevenção garantida de coimas e aprovação implícita. Algumas descrições preexistentes em Fátima, Leiria e Portalegre misturavam conceitos sem sentido técnico, como certificação de choque biológico ou análises que atestariam ausência de risco pneumónico. Esses trechos passaram a descrever avaliação, identificação de medidas e registos, sem novas promessas de capacidade operacional.

Nas páginas de formação e manutenção, saíram afirmações de certificação específica sem prova anexada nesta revisão. O texto passa a pedir confirmação da entidade, âmbito e documentação na proposta. A [DGERT disponibiliza a consulta de entidades formadoras certificadas](https://www.dgert.gov.pt/entidades-formadoras-certificadas); consultar essa página não confirma por si só a certificação de uma empresa concreta. Certificação DGERT, áreas certificadas, NP 4413, oficinas certificadas e âmbito dos prestadores continuam a exigir documentação nominativa atual. Os nomes e URLs comerciais dos serviços foram preservados.

Incêndios deixa de associar NP EN 671 genericamente à manutenção de todos os extintores ou prometer operacionalidade total. O texto orienta para normas/instruções aplicáveis e registos, sem prescrever um calendário universal. Foram acrescentadas ligações à matriz de formação e ao registo de incêndios nos parágrafos já existentes dos respetivos serviços.

Verificado nesta frente: substituições exatas, preservação da estrutura, ligações ao catálogo existente, TypeScript sem erros. Capacidade a confirmar: cobertura e meios operacionais já descritos, certificações nominativas, relações comerciais e depoimentos. Estes últimos foram preservados como conteúdo preexistente, sem os usar como evidência técnica nem lhes inventar correções de autoria.
