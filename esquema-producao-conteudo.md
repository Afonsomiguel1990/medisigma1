# Esquema de Produção de Conteúdo Medidigma (2025-2026)

Este documento consolidado serve como guia estratégico para a produção dos artigos do blog da Medidigma. Integra os dados técnicos do relatório inicial com a metodologia operacional do plano de conteúdo.

---

## 1. Metodologia de Produção (Workflow)

Para cada artigo, seguir rigorosamente estes 4 passos:

1.  **Validação & Pesquisa (Legal e Técnica)**
    *   **Nunca inventar dados.** Validar legislação (ex: Lei n.º 83/2021) e datas (atualizar 2026 para 2024/2025 quando apropriado).
    *   **Substituir Placeholders:** Procurar dados reais de Portugal (INE, ACT, Pordata).
    *   **Jurisprudência:** Procurar acórdãos recentes para dar autoridade.

1.5. **Regras de Formatação Críticas (MDX)**
    *   **Base de Dados:** Ao inserir no campo `content_mdx`, inserir **APENAS o corpo** do artigo. **NUNCA** incluir o bloco de frontmatter (`--- ... ---`). O frontmatter deve ser usado apenas nos ficheiros locais `.mdx`.
    *   **Âncoras de Cabeçalho:** Não usar `{#id}` nos títulos (ex: `## Título {#exemplo}` é proibido). O MDX interpreta as chavetas como código JavaScript e gera erro de compilação.
    *   **Tags HTML:** Evitar `<br />`. Usar linhas em branco para espaçamento e `---` para separadores horizontais.
    *   **Caracteres Especiais:** Evitar o uso de `{` e `}` fora de contextos controlados. Em tabelas, evitar símbolos como `<` ou `>` se possível, escrevendo-os por extenso ("menos de", "maior que").

2.  **Escrita Otimizada (SEO-First)**
    *   **Gatilho (Hook):** O primeiro parágrafo deve tocar numa "dor" do gestor (multa, acidente, custo).
    *   **Escaneabilidade:** Usar bullet points, negritos e parágrafos curtos.
    *   **Dados Reais:** Usar tabelas para comparar valores (coimas, limites, requisitos).
    *   **Links Internos:** Ligar sempre a 1-2 artigos existentes do blog (ex: "5 Avaliações", "Teletrabalho").

3.  **Estrutura Visual & Interatividade**
    *   **Índice Rápido:** Obrigatório no início.
    *   **Call to Action (CTA):** Inserir "Dicas Medidigma" a meio e um CTA comercial no final.

4.  **Revisão Final**
    *   Verificar tom de voz (Profissional, Pedagógico, Seguro).
    *   Confirmar funcionamento dos links.

---

## 2. Template de Artigo (Estrutura Padrão)

```markdown
---
title: 'Título Atrativo (com Palavra-Chave Principal)'
date: 'AAAA-MM-DD'
description: 'Meta-descrição curta e direta (150-160 chars) focada no benefício/resolução de problema.'
author: 'Equipa Medisigma'
imagem_destaque: 'URL_da_Imagem_Unsplash'
---

[Parágrafo de Introdução: Identificar o problema/dor + Estatística ou Dado Chocante + Promessa de Solução]

<br />

## Índice Rápido
- [Tópico 1](#link-1)
- ...

<br />

---

<br />

## [Tópico Principal 1] {#link-1}
Desenvolvimento técnico. Citar legislação.

### Subtópico Prático
Exemplos reais.

<br />

---

## [Tópico Principal 2] {#link-2}
...

> **Dica Medisigma:** [Conselho prático de "Insider" que mostre expertise].

<br />

---

## Perguntas Frequentes {#faq}
### "Pergunta comum do cliente?"
Resposta direta e curta.

<br />

---

## Conclusão de Profissional
Resumo do benefício.
[Ligação com o serviço da Medidigma].

**Call to Action Final**
- **Email:** dep.hst@medisigma.pt
- **Telefone:** 241 331 504
```

---

## 3. Roteiro dos Temas Pendentes

### **Tema 1: Riscos Psicossociais** (Prioridade Alta)
*   **Título Proposto:** Riscos Psicossociais em 2025: O Impacto Invisível de 5,3 Mil Milhões de Euros
*   **Ângulo:** Financeiro e Legal. Focar no custo do "Presentismo" vs "Absentismo".
*   **Legislação Chave:** Dever de avaliação de riscos psicossociais (ACT).
*   **Dados a Usar:** Custo da perda de produtividade (€5.3MM); Retorno do investimento em bem-estar (ROI).
*   **Links Internos:** Ligar ao artigo de "Teletrabalho" e "5 Avaliações".

### **Tema 10: Formação Obrigatória** (Compliance)
*   **Título Proposto:** 40 Horas de Formação Obrigatória: Como Rentabilizar este Investimento?
*   **Ângulo:** Transformar "custo burocrático" em "upskilling".
*   **Dados Chave:** Código do Trabalho (Art. 131º). Créditos de formação que vencem a favor do trabalhador.
*   **Call to Action:** Medidigma como entidade certificada (ou parceira).

### **Tema 4: Segurança Alimentar (HACCP)** (Setorial)
*   **Título Proposto:** Segurança Alimentar em 2026: Do HACCP às Proteínas Verdes
*   **Ângulo:** Inovação. Como o HACCP se adapta a "Plant-based" e desperdício zero.
*   **Dados Chave:** Estratégia "Do Prado ao Prato"; Gestão de novos alérgenos.

### **Tema 6: Robótica e IA** (Futuro/Tech)
*   **Título Proposto:** Robôs e Exoesqueletos: O Futuro da Segurança ou Novos Riscos?
*   **Ângulo:** Dualidade. A tecnologia resolve riscos antigos (esforço físico) mas cria novos (stress cognitivo, colisão).
*   **Conceito Chave:** "Cobots" (Robôs colaborativos) e avaliação de riscos específica.

### **Tema 5: Segurança Contra Incêndios (SCIE)** (Técnico)
*   **Título Proposto:** Medidas de Autoproteção (MAP): O Seu Edifício Está Legal?
*   **Ângulo:** Responsabilidade do proprietário/explorador.
*   **Pontos Chave:** Extintores + Simulacros + Formação. Diferença entre categorias de risco.

### **Tema 7: Agentes Químicos** (Saúde)
*   **Título Proposto:** Agentes Químicos no Trabalho: O Que os Olhos Não Veem, a Saúde Sente
*   **Ângulo:** Doenças profissionais a longo prazo (invisíveis).
*   **Conceito Chave:** VLEP (Valores Limite de Exposição Profissional).
*   **CTA:** Higiene Industrial e Medições.

### **Tema 9: Bem-Estar Corporativo** (RH/Gestão)
*   **Título Proposto:** Bem-Estar nas Empresas: Investir na Saúde para Reter Talento
*   **Ângulo:** "Salário Emocional" e Retenção.
*   **Ideias:** Nutrição, Cessação Tabágica, Ginástica Laboral.

### **Tema 8: Cultura de Segurança** (Liderança)
*   **Título Proposto:** Para Além das Regras: Como Criar uma Cultura de Segurança Positiva
*   **Ângulo:** Mudança de "Safety-I" (evitar erros) para "Safety-II" (promover sucessos).
*   **Conceito:** Liderança participativa e segurança psicológica.
