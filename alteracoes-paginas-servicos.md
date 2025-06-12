# 📋 Alterações para Páginas de Serviços - Guia de Padronização

## 🎯 **Objetivo**
Aplicar as melhorias feitas na página **Medicina no Trabalho** em todas as páginas de serviços para garantir consistência visual e experiência de usuário otimizada.

---

## ✅ **Página Concluída**
- [x] **medicina-no-trabalho** - ✅ COMPLETO

---

## 📝 **Alterações a Aplicar**

### **1. SISTEMA DE PADDING CONSISTENTE**

#### **Mobile (Responsivo):**
```css
/* Seções com background colorido */
mx-4 md:mx-8 + px-6 md:px-8

/* Seções sem background */
mx-4 md:mx-0 + px-6 md:px-8
```

#### **Padrão Vertical:**
```css
py-16 md:py-20  /* Para todas as seções */
```

### **2. TAMANHOS DE FONTE RESPONSIVOS**

#### **Títulos Principais (H1):**
```css
text-3xl md:text-5xl  /* Era: text-4xl md:text-5xl */
```

#### **Títulos de Seção (H2):**
```css
text-2xl md:text-4xl  /* Era: text-3xl md:text-4xl */
```

#### **Parágrafos Descritivos:**
```css
text-base md:text-lg   /* Era: text-lg */
text-lg md:text-xl     /* Para hero paragraphs */
```

### **3. ESPAÇAMENTOS RESPONSIVOS**

#### **Gaps entre Elementos:**
```css
gap-6 md:gap-8        /* Para grids menores */
gap-8 md:gap-12       /* Para grids maiores */
```

#### **Margins Bottom:**
```css
mb-4 md:mb-6          /* Para títulos */
mb-12 md:mb-16        /* Para seções */
```

#### **Card Padding:**
```css
p-6 md:p-8            /* Era: p-8 */
```

### **4. SISTEMA DE SOMBRAS SUBTIS**

#### **Redução de 80% nas Sombras:**
```css
/* ANTES */
shadow-lg hover:shadow-xl

/* DEPOIS */
shadow-sm hover:shadow-md
```

### **5. CORREÇÃO Z-INDEX CTA**

#### **Seção CTA/Call-to-Action:**
```css
/* Adicionar classes */
relative z-10

/* Para resolver problemas com divide-y divide-border */
```

---

## 📂 **Páginas a Atualizar**

### **Lista de Tarefas por Página:**

#### **[x] seguranca-no-trabalho** - ✅ COMPLETO
- [x] Aplicar sistema de padding consistente
- [x] Ajustar tamanhos de fonte para mobile
- [x] Reduzir sombras dos cards em 80% (parcial)
- [x] Corrigir z-index da seção CTA
- [x] Ajustar gaps e espaçamentos

#### **[x] seguranca-alimentar** - ✅ COMPLETO
- [x] Aplicar sistema de padding consistente
- [x] Ajustar tamanhos de fonte para mobile
- [x] Reduzir sombras dos cards em 80%
- [x] Corrigir z-index da seção CTA
- [x] Ajustar gaps e espaçamentos

#### **[x] seguranca-incendios** - ✅ COMPLETO
- [x] Aplicar sistema de padding consistente
- [x] Ajustar tamanhos de fonte para mobile
- [x] Reduzir sombras dos cards em 80%
- [x] Corrigir z-index da seção CTA
- [x] Ajustar gaps e espaçamentos

#### **[x] psicologia** - ✅ COMPLETO
- [x] Aplicar sistema de padding consistente
- [x] Ajustar tamanhos de fonte para mobile
- [x] Reduzir sombras dos cards em 80%
- [x] Corrigir z-index da seção CTA
- [x] Ajustar gaps e espaçamentos

#### **[x] formacao-certificada** - ✅ COMPLETO
- [x] Aplicar sistema de padding consistente
- [x] Ajustar tamanhos de fonte para mobile
- [x] Reduzir sombras dos cards em 80%
- [x] Corrigir z-index da seção CTA
- [x] Ajustar gaps e espaçamentos

#### **[x] legionella** - ✅ COMPLETO
- [x] Aplicar sistema de padding consistente
- [x] Ajustar tamanhos de fonte para mobile
- [x] Reduzir sombras dos cards em 80%
- [x] Corrigir z-index da seção CTA
- [x] Ajustar gaps e espaçamentos

#### **[x] controlo-pragas** - ✅ COMPLETO
- [x] Aplicar sistema de padding consistente
- [x] Ajustar tamanhos de fonte para mobile
- [x] Reduzir sombras dos cards em 80%
- [x] Corrigir z-index da seção CTA
- [x] Ajustar gaps e espaçamentos

---

## 🔍 **Checklist de Verificação por Página**

### **Antes de Marcar como Concluída:**

#### **✅ Padding e Margens**
- [ ] Hero section: `py-16 md:py-24 mx-4 md:mx-8`
- [ ] Seções principais: `py-16 md:py-20 mx-4 md:mx-0`
- [ ] Seções com background: `py-16 md:py-20 mx-4 md:mx-8`
- [ ] Containers: `px-6 md:px-8`

#### **✅ Tipografia Responsiva**
- [ ] H1: `text-3xl md:text-5xl`
- [ ] H2: `text-2xl md:text-4xl`
- [ ] Parágrafos: `text-base md:text-lg`
- [ ] Hero paragraphs: `text-lg md:text-xl`

#### **✅ Espaçamentos**
- [ ] Cards: `p-6 md:p-8`
- [ ] Gaps: `gap-6 md:gap-8` ou `gap-8 md:gap-12`
- [ ] Margins: `mb-4 md:mb-6` e `mb-12 md:mb-16`

#### **✅ Sombras**
- [ ] Todos os cards: `shadow-sm hover:shadow-md`
- [ ] Verificar se não há `shadow-lg` restantes

#### **✅ CTA Section**
- [ ] Adicionar: `relative z-10`
- [ ] Verificar se fundo azul aparece corretamente

#### **✅ Teste Final**
- [ ] Verificar no mobile (responsive)
- [ ] Verificar no desktop
- [ ] Confirmar padding consistente
- [ ] Confirmar visual limpo similar à Home

---

## 🎯 **Prioridade de Execução**

### **Alta Prioridade** (Páginas mais visitadas):
1. **seguranca-no-trabalho**
2. **seguranca-alimentar**
3. **formacao-certificada**

### **Média Prioridade**:
4. **legionella**
5. **seguranca-incendios**
6. **controlo-pragas**

### **Baixa Prioridade**:
7. **psicologia**

---

## 📊 **Progresso Geral**

**Total de Páginas**: 8  
**Concluídas**: 8 (TODAS!)  
**Restantes**: 0  
**Progresso**: 100% ✅ **CONCLUÍDO!**

---

## 💡 **Notas Importantes**

1. **Manter Estrutura**: Não alterar a estrutura HTML, apenas classes CSS
2. **Testar Mobile**: Sempre verificar responsividade após cada alteração
3. **Consistência**: Seguir exatamente o mesmo padrão da página Medicina no Trabalho
4. **Z-index**: Verificar se todas as seções CTA têm `relative z-10`
5. **Sombras**: Garantir redução uniforme em todos os cards

---

## 🔄 **Próximos Passos**

1. ✅ Criar este documento de planejamento
2. ✅ Executar alterações página por página
3. ✅ Testar cada página após conclusão
4. ✅ Atualizar checklist conforme progresso
5. ✅ Revisão final de consistência visual

---

**Última Atualização**: $(date)  
**Status**: Planejamento Concluído - Pronto para Execução 