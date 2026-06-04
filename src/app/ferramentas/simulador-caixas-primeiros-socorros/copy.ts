import type {
  FirstAidActivity,
  FirstAidActivityKey,
  FirstAidInputs,
  FirstAidResult,
} from "@/lib/simulador-caixas-primeiros-socorros";

export const FIRST_AID_LEGAL_NOTE =
  "Não existe um número específico definido por lei; este é o valor que aconselhamos para um negócio com a descrição que indicou.";

export const activityOptions: FirstAidActivity[] = [
  { key: "escritorio", label: "Escritório ou serviços", riskLevel: "baixo" },
  { key: "restauracao-alimentar", label: "Restauração, cozinha ou alimentar", riskLevel: "elevado" },
  { key: "industria-oficina", label: "Indústria, oficina ou manutenção", riskLevel: "elevado" },
  { key: "construcao-exterior", label: "Construção, obras ou trabalho exterior", riskLevel: "elevado" },
  { key: "logistica-armazem", label: "Logística, armazém ou transporte", riskLevel: "elevado" },
  { key: "saude-lares", label: "Saúde, lares ou clínicas", riskLevel: "elevado" },
  { key: "comercio-hotelaria", label: "Comércio, hotelaria ou atendimento", riskLevel: "baixo" },
  { key: "outro", label: "Outro setor", riskLevel: "baixo" },
];

export const contextOptions = [
  "Pisos diferentes",
  "Zonas de trabalho afastadas",
  "Viaturas de serviço",
  "Trabalho no exterior",
  "Obras ou estaleiros",
  "Cozinha ou preparação alimentar",
  "Máquinas ou ferramentas",
  "Armazém, cargas ou logística",
  "Atendimento ao público",
  "Horários alargados ou turnos",
] as const;

export const COPY = {
  breadcrumb: {
    home: "Início",
    blog: "Kit de primeiros socorros",
    current: "Simulador",
  },
  hero: {
    title: "Quantas caixas de primeiros socorros deve ter a sua empresa?",
    subtitle:
      "Indique o setor, o número de pessoas e as zonas separadas. Recebe uma recomendação prudente e pode pedir à Medisigma para avaliar e fornecer.",
  },
  form: {
    title: "Descrição do negócio",
    activityLabel: "Área ou setor principal",
    peopleLabel: "Quantas pessoas trabalham habitualmente no local?",
    peopleHint: "Inclua trabalhadores, turnos habituais e equipas presentes no mesmo espaço.",
    areasLabel: "Quantas áreas, pisos, viaturas ou equipas separadas existem?",
    areasHint: "Ex.: loja + armazém = 2. Uma carrinha de trabalho exterior também conta como zona separada.",
    contextTitle: "Contexto adicional",
    contextSubtitle: "Opcional. Selecione apenas as opções que fazem sentido para a empresa.",
  },
  result: {
    title: "Recomendação",
    totalLabel: "Caixas aconselhadas",
    legalNote: FIRST_AID_LEGAL_NOTE,
    basePeopleLabel: "Base por pessoas",
    baseAreasLabel: "Base por áreas separadas",
    extraRiskLabel: "Reforço por risco",
    reasons: {
      people: "A recomendação é determinada sobretudo pelo número de pessoas no local.",
      areas: "A recomendação aumenta porque existem áreas, pisos, viaturas ou equipas separadas.",
      risk: "A recomendação inclui um reforço porque a atividade indicada tende a exigir acesso mais próximo a material de primeiros socorros.",
    } satisfies Record<FirstAidResult["mainReason"], string>,
    method:
      "A conta usa uma referência prática: pelo menos 1 caixa, 1 por cada 25 pessoas, cobertura por área separada e reforço para atividades com maior exposição operacional.",
  },
  cta: {
    primary: "Pedir à Medisigma para avaliar e fornecer",
    formTitle: "Pedir avaliação",
    submit: "Enviar pedido",
    submitting: "A enviar...",
    success: "Recebemos o pedido. A equipa Medisigma vai responder com base nos dados indicados.",
    error: "Preencha empresa e email. Se o erro persistir, ligue 241 331 504.",
    messagePlaceholder: "Ex.: temos duas lojas e uma carrinha técnica; queremos caixas completas e reposição.",
  },
  sources: {
    title: "Enquadramento",
    text:
      "A DGS orienta que o conteúdo, número e localização das malas sejam definidos pelos Serviços de Segurança e Saúde no Trabalho ou Saúde Ocupacional, considerando trabalhadores, dispersão, área, atividade e riscos.",
    links: [
      {
        href: "https://www.dgs.pt/saude-ocupacional/referenciais-tecnicos-e-normativos/informacoes-tecnicas/informacao-tecnica-n-12010-primeiros-socorros-no-local-de-trabalho-.aspx",
        label: "DGS - Informação Técnica n.º 01/2010",
      },
      {
        href: "https://www.dgs.pt/saude-ocupacional/organizacao-de-servicos-de-saude-do-trabalho/requisitos-de-organizacao-e-funcionamento/atividades/emergencia-e-primeiros-socorros.aspx",
        label: "DGS - Emergência e primeiros socorros",
      },
    ],
  },
  faq: [
    {
      question: "O número apresentado é obrigatório por lei?",
      answer:
        "Não. A ferramenta apresenta uma recomendação prudente para triagem comercial e técnica. O número e a localização devem ser ajustados aos riscos e à organização real da empresa.",
    },
    {
      question: "O simulador substitui a avaliação de Segurança e Saúde no Trabalho?",
      answer:
        "Não. A avaliação de SST ou Saúde Ocupacional continua a ser a referência para definir conteúdo, localização e necessidades adicionais.",
    },
    {
      question: "Posso pedir só reposição de material?",
      answer:
        "Sim. No pedido pode indicar se precisa de caixas novas, reposição, verificação de validades ou apoio para definir localização.",
    },
  ],
} as const;

export const PAGE_METADATA = {
  title: "Simulador de caixas de primeiros socorros | Medisigma",
  description:
    "Calcule uma recomendação prudente de caixas de primeiros socorros para a sua empresa por número de pessoas, áreas separadas e tipo de atividade.",
};

export function getActivityByKey(key: FirstAidActivityKey) {
  return activityOptions.find((activity) => activity.key === key) ?? activityOptions[0];
}

export function buildFirstAidSummaryLines(
  inputs: FirstAidInputs,
  result: FirstAidResult,
  selectedContexts: string[],
) {
  const activity = getActivityByKey(inputs.activity);

  return [
    "Pedido enviado a partir do simulador de caixas de primeiros socorros.",
    "",
    `Área/setor: ${activity.label}`,
    `Pessoas no local: ${inputs.people}`,
    `Áreas, pisos, viaturas ou equipas separadas: ${inputs.separatedAreas}`,
    `Contexto assinalado: ${selectedContexts.join(", ") || "Nenhum"}`,
    "",
    `Recomendação: ${result.recommendedBoxes} caixa(s) aconselhada(s).`,
    `Base por pessoas: ${result.baseByPeople}`,
    `Base por áreas separadas: ${result.baseByAreas}`,
    `Reforço por risco: ${result.extraRisk}`,
    `Motivo principal: ${COPY.result.reasons[result.mainReason]}`,
    "",
    FIRST_AID_LEGAL_NOTE,
  ].join("\n");
}
