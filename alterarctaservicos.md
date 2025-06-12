# Instruções para Atualizar CTA das Páginas de Serviços

## 🎯 Objetivo
Padronizar todas as secções CTA das páginas de serviços para seguir o mesmo design e estrutura das páginas **Legionella** e **Medicina no Trabalho**.

## 🚨 PROBLEMA CRÍTICO IDENTIFICADO

**SITUAÇÃO ATUAL:**
- ✅ **Legionella:** Usa `ContactForm` → **ENVIA para webhook do Make** ✅
- ❌ **Todas as outras páginas:** Formulários HTML estáticos → **NÃO ENVIAM NADA** ❌

**IMPACTO:**
- Leads perdidos - formulários não funcionam
- Má experiência do utilizador 
- Dados não chegam ao Make/CRM

## 📋 Páginas a Corrigir (URGENTE)
- ✅ Legionella - **JÁ CORRETO** (usa ContactForm com webhook)
- ❌ Medicina no Trabalho - **CORRIGIR** (formulário HTML estático)
- ❌ Segurança Alimentar - **CORRIGIR** (formulário HTML estático)
- ❌ Formação Certificada - **CORRIGIR** (formulário HTML estático)
- ❌ Controlo de Pragas - **CORRIGIR** (formulário HTML estático)
- ❌ Segurança Incêndios - **CORRIGIR** (formulário HTML estático)
- ❌ Segurança no Trabalho - **CORRIGIR** (formulário HTML estático)
- ❌ Psicologia - **CORRIGIR** (formulário HTML estático)

## 🎨 Estrutura do CTA Padrão

### Layout Geral
```tsx
<section id="cta-section" className="relative z-10 bg-secondary py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
  <div className="container mx-auto px-6 md:px-8 max-w-5xl">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* LADO ESQUERDO */}
      <div className="text-white">
        {/* Conteúdo específico do serviço */}
      </div>
      
      {/* LADO DIREITO */}
      <ContactForm />
    </div>
  </div>
</section>
```

### Lado Esquerdo (Padrão)
```tsx
<div className="text-white">
  <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
    [TÍTULO ESPECÍFICO DO SERVIÇO]
  </h2>
  <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
    [DESCRIÇÃO ESPECÍFICA DO SERVIÇO]
  </p>
  
  <div className="space-y-4 mb-8 text-blue-100">
    <div className="flex items-center space-x-3">
      <CheckCircle className="w-5 h-5 text-white" />
      <span>[BENEFÍCIO 1]</span>
    </div>
    <div className="flex items-center space-x-3">
      <CheckCircle className="w-5 h-5 text-white" />
      <span>[BENEFÍCIO 2]</span>
    </div>
    <div className="flex items-center space-x-3">
      <CheckCircle className="w-5 h-5 text-white" />
      <span>[BENEFÍCIO 3]</span>
    </div>
  </div>
  
  <div className="flex flex-col sm:flex-row gap-4">
    <a 
      href="[LINK WHATSAPP ESPECÍFICO]" 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
      </svg>
      WhatsApp
    </a>
    <a href="tel:241331504" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors text-center">
      241 331 504
    </a>
  </div>
</div>
```

## 📝 Conteúdo Específico por Serviço

### 1. Segurança Alimentar
**Título:** `"Proteja o Seu Negócio e os Seus Clientes"`
**Descrição:** `"A segurança alimentar não é uma opção, é uma obrigação. Contacte a MediSigma para uma avaliação completa e descubra como podemos ajudar a sua empresa a implementar um sistema HACCP eficaz e em conformidade com a lei."`
**Benefícios:**
- `"Proposta personalizada e sem compromisso"`
- `"Resposta rápida em 24 horas úteis"`
- `"Soluções adaptadas ao seu setor alimentar"`
**WhatsApp:** `"https://wa.me/351938698260?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Segurança%20Alimentar."`

### 2. Formação Certificada
**Título:** `"Vamos Criar o Seu Plano de Formação?"`
**Descrição:** `"Com base no nosso plano ou em necessidades específicas, apresentamos uma proposta concreta que inclui programa, duração e custos para qualificar a sua equipa."`
**Benefícios:**
- `"Formação certificada pela DGERT"`
- `"Cursos à medida das suas necessidades"`
- `"Formação nas suas instalações ou nas nossas"`
**WhatsApp:** `"https://wa.me/351938698260?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Formação%20Certificada."`

### 3. Controlo de Pragas
**Título:** `"Proteja o seu Espaço de Pragas"`
**Descrição:** `"Ambientes livres de pragas são essenciais para a saúde e segurança de todos. A nossa equipa especializada está pronta para criar um plano de controlo à medida das suas necessidades."`
**Benefícios:**
- `"Produtos autorizados pela Direção-Geral da Saúde"`
- `"Técnicos qualificados e certificados"`
- `"Monitorização contínua e eficaz"`
**WhatsApp:** `"https://wa.me/351938698260?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Controlo%20de%20Pragas."`

### 4. Segurança Incêndios
**Título:** `"Proteja o Seu Espaço contra Incêndios"`
**Descrição:** `"A prevenção de incêndios é fundamental para a segurança de pessoas e bens. Implementamos soluções completas de segurança contra incêndios adaptadas às suas necessidades."`
**Benefícios:**
- `"Conformidade com toda a legislação"`
- `"Planos de emergência personalizados"`
- `"Formação e treino especializado"`
**WhatsApp:** `"https://wa.me/351938698260?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Segurança%20contra%20Incêndios."`

### 5. Segurança no Trabalho
**Título:** `"Garanta um Local de Trabalho Seguro"`
**Descrição:** `"A segurança no trabalho é essencial para proteger os seus colaboradores e garantir o cumprimento legal. Implementamos soluções completas adaptadas à sua empresa."`
**Benefícios:**
- `"Cumprimento integral da legislação"`
- `"Redução de acidentes de trabalho"`
- `"Melhoria do ambiente de trabalho"`
**WhatsApp:** `"https://wa.me/351938698260?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Segurança%20no%20Trabalho."`

### 6. Psicologia
**Título:** `"Cuide da Saúde Mental dos Seus Colaboradores"`
**Descrição:** `"O bem-estar psicológico no trabalho é fundamental para a produtividade e satisfação dos colaboradores. Oferecemos serviços especializados em psicologia do trabalho."`
**Benefícios:**
- `"Melhoria do clima organizacional"`
- `"Redução do stress e burnout"`
- `"Aumento da produtividade e satisfação"`
**WhatsApp:** `"https://wa.me/351938698260?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Psicologia."`

## 📋 Formulário do Lado Direito

### ⚠️ IMPORTANTE: Usar ContactForm Component (COM WEBHOOK FUNCIONAL)

**PROBLEMA CRÍTICO IDENTIFICADO:** 
- ❌ Apenas a página Legionella está a enviar dados para webhook do Make
- ❌ Todas as outras páginas têm formulários HTML "falsos" sem funcionalidade
- ❌ Quando user clica "Enviar Pedido" → **NÃO ACONTECE NADA**

**SOLUÇÃO:** Usar o `ContactForm` component que já tem webhook configurado.

### Opção OBRIGATÓRIA: ContactForm Component
```tsx
<ContactForm />
```

**Vantagens:**
- ✅ **TEM webhook configurado** para Make (`https://hook.eu1.make.com/yg81xw9zg45ltry61rj5ja40v3uloa6s`)
- ✅ **FUNCIONA corretamente** - envia dados para Make
- ✅ **Validação de campos** obrigatórios
- ✅ **Feedback visual** para o utilizador
- ✅ **Tratamento de erros** incluído
- ✅ **Design já adequado** ao padrão visual

### ❌ NÃO USAR: Formulário HTML Estático (Sem Funcionalidade)
```tsx
<!-- ❌ NÃO USAR - Este formulário não envia dados para lugar nenhum -->
<div className="bg-white p-8 rounded-xl shadow-2xl">
  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contacto Rápido</h3>
  <form className="space-y-4">
    <!-- Este formulário é apenas visual - não tem funcionalidade! -->
    <button type="submit">Enviar Pedido</button> <!-- Não faz nada! -->
  </form>
</div>
```

## ⚠️ Pontos de Atenção

### Imports Necessários
```tsx
import { CheckCircle } from 'lucide-react';
// OBRIGATÓRIO - ContactForm com webhook funcional:
import ContactForm from '@/components/ContactForm';
```

### Classes CSS Importantes
- `id="cta-section"` - **OBRIGATÓRIO** para navegação do botão hero
- `relative z-10` - **OBRIGATÓRIO** para evitar sobreposição
- `bg-secondary` - Cor de fundo azul padrão
- `text-white` e `text-primary-foreground/90` - Cores de texto corretas

### Links Específicos por Serviço
- **SEMPRE** usar `target="_blank" rel="noopener noreferrer"` para WhatsApp
- **SEMPRE** manter o telefone `tel:241331504`
- **PERSONALIZAR** a mensagem WhatsApp para cada serviço

## 🔄 Processo de Implementação

1. **Substituir** a secção CTA existente pela nova estrutura
2. **Personalizar** título, descrição e benefícios para cada serviço
3. **Verificar** se o link WhatsApp está correto
4. **Testar** se o botão "Fale connosco" do hero navega para `#cta-section`
5. **Confirmar** que não há sobreposição de elementos (z-index)

## 🔧 Configuração do ContactForm por Serviço

O `ContactForm` component precisa ser personalizado para identificar de que serviço vem o pedido. Para isso, é necessário modificar o campo `pagina` no component para cada serviço:

### Valores do Campo 'pagina' por Serviço:
- **Legionella:** `'Legionella - Controlo e Prevenção'` ✅ (já configurado)
- **Medicina no Trabalho:** `'Medicina no Trabalho'`
- **Segurança Alimentar:** `'Segurança Alimentar'`
- **Formação Certificada:** `'Formação Certificada'`
- **Controlo de Pragas:** `'Controlo de Pragas'`
- **Segurança Incêndios:** `'Segurança contra Incêndios'`
- **Segurança no Trabalho:** `'Segurança no Trabalho'`
- **Psicologia:** `'Psicologia'`

### Como Personalizar (Opção 1 - Recomendada):
Passar a informação do serviço como prop para o ContactForm:

```tsx
<ContactForm serviceName="Nome do Serviço" />
```

### Como Personalizar (Opção 2 - Manual):
Criar um ContactForm específico para cada serviço ou modificar o campo `pagina` no component.

## ✅ Checklist Final

- [ ] CTA tem `id="cta-section"`
- [ ] Botão hero navega corretamente para CTA
- [ ] WhatsApp link personalizado para o serviço
- [ ] Telefone 241331504 mantido
- [ ] **Import ContactForm correto** 
- [ ] **ContactForm component implementado** (EM VEZ de formulário HTML)
- [ ] **Campo 'pagina' personalizado** para identificar o serviço
- [ ] **Webhook funcionando** - teste enviando formulário
- [ ] Design responsivo mantido
- [ ] Não há sobreposição de elementos

## 🚨 ALERTA CRÍTICO

**ANTES de implementar, verificar:**
1. ✅ O ContactForm está a funcionar na página Legionella?
2. ✅ O webhook está a receber dados no Make?
3. ✅ Todos os imports estão corretos?

**Todas as páginas DEVEM usar ContactForm com webhook funcional!** 