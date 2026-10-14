import type { ServiceMediaId } from './service-media';

export type TechnicalService = {
  key: string; name: string; title: string; description: string; audience: string;
  scope: string[]; deliverables: string[]; preparation: string[]; limitation: string;
  questions: { question: string; answer: string }[];
  links: { href: string; label: string }[]; media: ServiceMediaId[];
};

export const technicalServices = {
  legionella: {
    key: 'legionella', name: 'Legionella', title: 'Avaliação de risco e prevenção de Legionella',
    description: 'Avaliação inicial, plano de prevenção, colheitas e acompanhamento dos sistemas de água da sua instalação. Fale com a Medisigma para definir o âmbito.',
    audience: 'Para responsáveis por instalações industriais, alojamentos, edifícios de serviços e outros espaços com redes de água ou equipamentos que possam produzir aerossóis.',
    scope: ['Identificar as redes, equipamentos e utilização da instalação, incluindo os documentos e resultados já disponíveis.', 'Avaliar o risco e definir o plano ou programa aplicável, os responsáveis, os pontos de controlo e os registos necessários.', 'Preparar as colheitas e o acompanhamento dos resultados, segundo o âmbito acordado para a instalação.', 'Acompanhar a execução das medidas e a revisão dos procedimentos quando existam alterações ou resultados que o justifiquem.'],
    deliverables: ['Enquadramento da instalação e identificação das necessidades de prevenção.', 'Plano ou programa, procedimentos e registos definidos na proposta.', 'Resultados das análises contratadas e orientação para o acompanhamento das medidas.'],
    preparation: ['Concelho e tipo de instalação: indústria, hotel, condomínio, unidade de saúde ou outro.', 'Equipamentos e redes existentes, como torres de arrefecimento, água quente sanitária ou chuveiros.', 'Plano atual, análises anteriores e intervenções recentes, se existirem. Não é necessário enviar estes documentos no primeiro pedido.'],
    limitation: 'O enquadramento, a frequência das colheitas e as medidas dependem dos sistemas e do risco identificado. Nem todas as instalações estão sujeitas ao mesmo plano. O âmbito dos ensaios e os requisitos aplicáveis são confirmados antes da intervenção.',
    questions: [
      { question: 'Posso pedir uma avaliação sem ter um plano anterior?', answer: 'Sim. Indique o tipo de instalação e os sistemas que conhece. A avaliação inicial permite identificar a informação em falta e preparar o acompanhamento.' },
      { question: 'As análises substituem o plano de prevenção?', answer: 'Não. As análises fazem parte do acompanhamento definido para a instalação. Os procedimentos, a manutenção e os registos também devem ser considerados.' },
      { question: 'O que fica incluído na proposta?', answer: 'A proposta identifica o âmbito, os entregáveis e as condições das colheitas e do acompanhamento. Os serviços necessários são definidos a partir das características da instalação.' },
    ],
    links: [{ href: '/faqs/legionella/', label: 'Perguntas frequentes sobre Legionella' }, { href: '/blog/plano-prevencao-controlo-legionella-empresas/', label: 'Plano de prevenção e controlo: guia para empresas' }], media: [],
  },
  radao: {
    key: 'radao', name: 'Radão', title: 'Avaliação e medição de radão em empresas',
    description: 'Precisa de avaliar o radão nas instalações da sua empresa? Fale com a Medisigma sobre a localização, os pisos ocupados e as medições já realizadas.',
    audience: 'Para empresas e responsáveis por edifícios que precisam de conhecer a exposição ao radão nos espaços de trabalho, incluindo caves, rés do chão e outros pisos ocupados.',
    scope: ['Enquadrar o pedido a partir da localização, utilização do edifício e avaliações anteriores.', 'Preparar a avaliação e a medição adequadas aos espaços ocupados, com pontos e duração definidos antes do início.', 'Acompanhar o pedido e esclarecer os próximos passos após a disponibilização dos resultados.'],
    deliverables: ['Proposta com o âmbito da medição e as condições de execução.', 'Resultados e relatório da avaliação contratada.', 'Indicação dos passos seguintes em função dos resultados e do enquadramento das instalações.'],
    preparation: ['Concelho, localização do edifício e atividade da empresa.', 'Pisos ocupados, existência de caves e utilização habitual dos espaços.', 'Medições anteriores e alterações ao edifício ou à ventilação, caso existam.'],
    limitation: 'Um mapa de suscetibilidade ajuda a enquadrar o risco, mas não substitui a medição no edifício. A duração, os pontos de medição e os requisitos técnicos são confirmados na proposta. Não é possível garantir um resultado antes de medir.',
    questions: [
      { question: 'O mapa de radão permite saber o resultado da minha empresa?', answer: 'Não. As condições variam entre edifícios e espaços do mesmo edifício. A medição permite avaliar a situação concreta.' },
      { question: 'É possível obter uma avaliação representativa numa visita rápida?', answer: 'A APA recomenda que a monitorização inicial com detetores passivos decorra durante pelo menos três meses, podendo ir até um ano. A estratégia deve ser adequada à instalação e ao objetivo da avaliação.' },
      { question: 'Ainda não sei quantos pontos tenho de medir. Posso pedir proposta?', answer: 'Sim. Indique a localização, os pisos ocupados e a utilização dos espaços. A equipa esclarece a informação necessária para preparar o pedido.' },
    ],
    links: [{ href: '/blog/o-que-e-o-radao/', label: 'O que é o radão e como preparar uma avaliação' }, { href: 'https://apambiente.pt/prevencao-e-gestao-de-riscos/locais-de-trabalho', label: 'APA: radão nos locais de trabalho' }], media: [],
  },
  'ruido-ocupacional': {
    key: 'ruido-ocupacional', name: 'Ruído Ocupacional', title: 'Avaliação de ruído ocupacional',
    description: 'A Medisigma avalia o ruído nos locais de trabalho. Medições, análise da exposição e relatório para apoiar as medidas de prevenção da sua empresa.',
    audience: 'Para empresas industriais, oficinas e outras atividades com máquinas, equipamentos ou tarefas que possam expor os trabalhadores ao ruído.',
    scope: ['Conhecer as tarefas, fontes de ruído, horários e grupos de trabalhadores a avaliar.', 'Preparar e realizar medições representativas do trabalho, considerando os ciclos e condições de funcionamento.', 'Interpretar os resultados e identificar medidas de prevenção e necessidades de acompanhamento.'],
    deliverables: ['Registo das condições e das tarefas avaliadas.', 'Relatório dos resultados da avaliação e do seu enquadramento.', 'Recomendações para apoiar a prevenção e a revisão das condições de trabalho.'],
    preparation: ['Atividade, concelho e tarefas que pretende avaliar.', 'Máquinas utilizadas, turnos e duração aproximada das tarefas.', 'Avaliações anteriores ou alterações de equipamentos, se existirem. A visita deve permitir observar o trabalho habitual.'],
    limitation: 'Esta avaliação trata da exposição dos trabalhadores. Pedidos de ruído de vizinhança ou de licenciamento acústico têm um âmbito diferente e devem ser identificados no contacto. O número de medições depende das tarefas e da variabilidade da exposição.',
    questions: [
      { question: 'A medição deve decorrer com as máquinas a funcionar?', answer: 'As condições devem representar o trabalho que se pretende avaliar. A equipa combina consigo os períodos e as tarefas a observar.' },
      { question: 'Uma leitura junto de uma máquina representa todo o turno?', answer: 'Não necessariamente. A avaliação deve considerar as tarefas, a duração e as variações da exposição ao longo do trabalho.' },
      { question: 'Posso ver um exemplo do trabalho da Medisigma?', answer: 'Sim. Nesta página apresentamos fotografias e um vídeo de uma avaliação na Sofalca, em Bemposta, Abrantes.' },
    ],
    links: [{ href: '/blog/ruido-no-trabalho-avaliacao-medicao/', label: 'Ruído no trabalho: quando avaliar e medir' }, { href: '/servicos/seguranca-no-trabalho/', label: 'Acompanhamento em segurança no trabalho' }], media: ['sofalca-ruido'],
  },
  'qualidade-do-ar-interior': {
    key: 'qualidade-do-ar-interior', name: 'Qualidade do Ar Interior', title: 'Avaliação da qualidade do ar interior',
    description: 'Avaliação e medições da qualidade do ar interior pela Medisigma. Conheça as condições do edifício e prepare as medidas de melhoria com apoio técnico.',
    audience: 'Para responsáveis por escritórios, edifícios de comércio e serviços, alojamentos e outros espaços de trabalho que precisam de avaliar as condições do ar interior.',
    scope: ['Recolher informação sobre a utilização, ocupação, ventilação e motivos do pedido.', 'Definir os espaços, as condições de medição e os parâmetros aplicáveis à avaliação.', 'Realizar a avaliação e apresentar os resultados, com recomendações de acompanhamento.'],
    deliverables: ['Âmbito de avaliação acordado para o edifício e a sua utilização.', 'Relatório com os parâmetros avaliados, condições de medição e resultados.', 'Recomendações para orientar medidas de melhoria e verificações posteriores.'],
    preparation: ['Tipo de edifício, concelho e utilização dos espaços.', 'Ocupação habitual, horários e informação disponível sobre ventilação.', 'Motivo do pedido, avaliações anteriores ou alterações recentes, sem incluir dados de saúde pessoais.'],
    limitation: 'Os parâmetros e o tipo de avaliação dependem do edifício e do objetivo. Uma leitura isolada de CO₂ não caracteriza todos os fatores da qualidade do ar. A avaliação específica de radão deve ser identificada separadamente no pedido.',
    questions: [
      { question: 'Que parâmetros são medidos?', answer: 'São definidos em função do edifício, da utilização e do enquadramento aplicável. A proposta identifica o âmbito antes da intervenção.' },
      { question: 'A avaliação inclui radão?', answer: 'O radão exige uma estratégia de medição própria. Se pretende avaliar este risco, escolha Radão no pedido ou indique que precisa de ambos os serviços.' },
      { question: 'O edifício deve estar ocupado durante a medição?', answer: 'As condições devem ser adequadas ao objetivo da avaliação e representativas da utilização. A equipa confirma consigo os horários e a preparação necessária.' },
    ],
    links: [{ href: '/blog/qualidade-do-ar-interior-como-avaliar/', label: 'Qualidade do ar interior: como avaliar' }, { href: '/servicos/radao/', label: 'Avaliação específica de radão' }, { href: 'https://apambiente.pt/ar-e-ruido/ar-interior', label: 'APA: qualidade do ar interior' }], media: [],
  },
} satisfies Record<string, TechnicalService>;

export type TechnicalServiceKey = keyof typeof technicalServices;
export const priorityServices = [
  { key: 'legionella', name: 'Legionella', purpose: 'Redes de água, equipamentos e prevenção.' },
  { key: 'radao', name: 'Radão', purpose: 'Avaliação e medição nos espaços ocupados.' },
  { key: 'ruido-ocupacional', name: 'Ruído ocupacional', purpose: 'Exposição dos trabalhadores durante as tarefas.' },
  { key: 'qualidade-do-ar-interior', name: 'Qualidade do ar interior', purpose: 'Condições do ar e utilização dos edifícios.' },
  { key: 'manutencao-extintores', name: 'Manutenção de extintores', purpose: 'Acompanhamento dos equipamentos da instalação.' },
  { key: 'seguranca-alimentar', name: 'HACCP e segurança alimentar', purpose: 'Procedimentos e acompanhamento do estabelecimento.' },
] as const;
