import type { ServiceMediaId } from './service-media';
import type { CommercialHeroImage } from '@/components/commercial-hero';

export type TechnicalService = {
  key: string; name: string; title: string; description: string; intro: string;
  image: CommercialHeroImage; action: string;
  scopeTitle: string; scope: string[]; deliverables: string[]; preparation: string[];
  contactTitle: string; contactText: string;
  questions: { question: string; answer: string }[];
  links: { href: string; label: string }[]; media: ServiceMediaId[];
};

export const technicalServices = {
  legionella: {
    key: 'legionella', name: 'Legionella', title: 'Prevenção e controlo de Legionella',
    description: 'Avaliação de risco, plano de prevenção, análises e acompanhamento de Legionella. Fale com a Medisigma sobre os sistemas de água da sua empresa.',
    intro: 'Sabe que cuidados precisam os sistemas de água da sua empresa? A Medisigma ajuda a avaliar o risco de Legionella e a organizar o plano de prevenção, as análises e o acompanhamento das instalações.',
    image: { src: '/images/uploads/servicos/legionella-recolher-amostra.png', alt: 'Recolha de uma amostra de água para avaliação de Legionella' },
    action: 'Pedir apoio para Legionella', scopeTitle: 'Uma prevenção ajustada à sua instalação',
    scope: ['Começamos pelas redes de água, equipamentos e utilização do edifício. Analisamos também os planos e resultados que já tem.', 'Definimos o plano ou programa aplicável, com procedimentos, responsáveis e pontos de controlo.', 'Preparamos as colheitas e acompanhamos os resultados das análises previstas para a instalação.', 'Apoiamos a aplicação das medidas e a revisão dos procedimentos quando há alterações ou novos resultados.'],
    deliverables: ['Avaliação das necessidades de prevenção dos sistemas de água.', 'Plano ou programa com os procedimentos e registos necessários.', 'Resultados das análises contratadas e orientação para os passos seguintes.'],
    preparation: ['A localização e o tipo de instalação, como hotel, indústria, condomínio ou unidade de saúde.', 'Os sistemas de água que conhece, incluindo chuveiros, água quente sanitária ou torres de arrefecimento.', 'Se já existe um plano de prevenção ou se foram feitas análises.'],
    contactTitle: 'Vamos cuidar da prevenção na sua empresa.',
    contactText: 'Quer começar um plano ou perceber se o acompanhamento atual é suficiente? Conte-nos como funcionam as suas instalações. A nossa equipa ajuda a definir o apoio de que precisa e responde em até 48 horas úteis.',
    questions: [
      { question: 'Posso pedir uma avaliação sem ter um plano anterior?', answer: 'Sim. Podemos começar pelo tipo de instalação e pelos sistemas de água que conhece. A avaliação inicial ajuda a perceber o que é necessário fazer.' },
      { question: 'As análises substituem o plano de prevenção?', answer: 'As análises permitem acompanhar a situação da instalação. O plano reúne também os procedimentos de manutenção, as medidas de prevenção e os registos de controlo.' },
      { question: 'Todas as instalações precisam do mesmo acompanhamento?', answer: 'O acompanhamento depende dos sistemas de água e do risco identificado. A proposta define o plano ou programa aplicável, as colheitas, os ensaios e as condições da intervenção.' },
    ],
    links: [{ href: '/faqs/legionella/', label: 'Perguntas frequentes sobre Legionella' }, { href: '/blog/plano-prevencao-controlo-legionella-empresas/', label: 'O que deve incluir um plano de prevenção de Legionella' }], media: [],
  },
  radao: {
    key: 'radao', name: 'Radão', title: 'Medição de radão em empresas',
    description: 'Saiba quanto radão existe no ar das suas instalações. Fale com a Medisigma sobre a medição de radão e os próximos passos para a sua empresa.',
    intro: 'O radão é um gás radioativo natural, sem cor nem cheiro, que pode acumular-se dentro dos edifícios. Medir a sua concentração permite conhecer o ar que a sua equipa respira. Fale com a Medisigma sobre a avaliação das suas instalações.',
    image: { src: '/images/servicos/radao-edificio.webp', alt: 'Ilustração em corte de um edifício, com o percurso do radão do solo para os espaços interiores' },
    action: 'Quero avaliar o radão', scopeTitle: 'Saiba o que se passa no seu edifício',
    scope: ['Conte-nos onde ficam as instalações e como são utilizadas. A localização e os pisos ocupados ajudam a preparar a avaliação.', 'Definimos consigo os espaços a avaliar e as condições da medição antes do início.', 'Acompanhamos o pedido até aos resultados e ajudamos a esclarecer os próximos passos.'],
    deliverables: ['Proposta de medição para os espaços da sua empresa.', 'Resultados e relatório da avaliação contratada.', 'Orientação sobre os passos seguintes, de acordo com os resultados.'],
    preparation: ['O concelho onde ficam as instalações.', 'Os pisos utilizados pela equipa e a existência de caves.', 'Se já foram feitas medições ou alterações à ventilação.'],
    contactTitle: 'Comece por conhecer o radão nas suas instalações.',
    contactText: 'Tem dúvidas sobre a medição ou quer avançar com uma avaliação? Conte-nos onde fica a sua empresa. Ajudamos a perceber o que é necessário e a preparar o próximo passo. Respondemos em até 48 horas úteis.',
    questions: [
      { question: 'Como sei se existe radão no meu edifício?', answer: 'O radão está presente no ar, mas a concentração varia de edifício para edifício. A medição permite conhecer a situação das suas instalações. O mapa de suscetibilidade ajuda a enquadrar a zona, mas não substitui essa medição.' },
      { question: 'Quanto tempo demora uma medição de radão?', answer: 'A APA recomenda que a monitorização inicial com detetores passivos decorra durante pelo menos três meses, podendo ir até um ano. A duração e os pontos de medição são definidos de acordo com o edifício e o objetivo da avaliação.' },
      { question: 'Preciso de saber quantos detetores são necessários?', answer: 'Pode contactar-nos sem essa informação. Começamos pela localização, pelos pisos ocupados e pela utilização dos espaços para preparar a medição.' },
    ],
    links: [{ href: '/blog/o-que-e-o-radao/', label: 'Radão no local de trabalho: o que precisa de saber' }, { href: 'https://apambiente.pt/prevencao-e-gestao-de-riscos/radao', label: 'Informação da APA sobre o radão' }], media: [],
  },
  'ruido-ocupacional': {
    key: 'ruido-ocupacional', name: 'Ruído Ocupacional', title: 'Avaliação de ruído ocupacional',
    description: 'Medição de ruído no trabalho, avaliação da exposição e relatório técnico. A Medisigma ajuda a definir as medidas de prevenção para a sua equipa.',
    intro: 'Quanto ruído acompanha a sua equipa ao longo do dia? Medimos a exposição durante o trabalho e ajudamos a perceber onde é preciso atuar. Veja a nossa equipa numa avaliação na Sofalca, em Abrantes.',
    image: { src: '/media/servicos/avaliacao-ruido-sofalca.webp', alt: 'Equipa Medisigma a realizar uma avaliação de ruído na Sofalca, em Abrantes', position: 'center 52%' },
    action: 'Pedir avaliação de ruído', scopeTitle: 'Medir durante o trabalho faz a diferença',
    scope: ['Conhecemos as tarefas, as máquinas e os turnos para perceber como varia a exposição ao ruído.', 'Realizamos medições em condições representativas da atividade, nos períodos combinados com a empresa.', 'Analisamos os resultados e identificamos medidas para apoiar a proteção dos trabalhadores.'],
    deliverables: ['Registo das tarefas e das condições avaliadas.', 'Relatório com os resultados e o enquadramento da exposição.', 'Recomendações para orientar as medidas de prevenção.'],
    preparation: ['A atividade da empresa e a localização das instalações.', 'As tarefas ou máquinas que pretende avaliar.', 'Os turnos e as alterações recentes a equipamentos ou processos.'],
    contactTitle: 'Perceba onde o ruído exige atenção.',
    contactText: 'Uma máquina nova, uma tarefa ruidosa ou uma avaliação por atualizar? Conte-nos o que se passa na sua empresa. Preparamos consigo a avaliação em condições reais de trabalho e respondemos em até 48 horas úteis.',
    questions: [
      { question: 'A medição deve decorrer com as máquinas a funcionar?', answer: 'Sim, quando fazem parte do trabalho a avaliar. Combinamos consigo os períodos e as tarefas para que a medição represente a atividade habitual.' },
      { question: 'Uma leitura junto de uma máquina representa todo o turno?', answer: 'A exposição depende das tarefas, da duração e das variações ao longo do dia. A avaliação tem em conta esse conjunto para interpretar os resultados.' },
      { question: 'Este serviço abrange ruído de vizinhança?', answer: 'Este serviço avalia a exposição dos trabalhadores ao ruído. Se a sua questão é ruído de vizinhança ou licenciamento acústico, descreva-a no contacto para podermos orientar o pedido.' },
    ],
    links: [{ href: '/blog/ruido-no-trabalho-avaliacao-medicao/', label: 'Quando avaliar e medir o ruído no trabalho' }, { href: '/servicos/seguranca-no-trabalho/', label: 'Acompanhamento em segurança no trabalho' }], media: ['sofalca-ruido'],
  },
  'qualidade-do-ar-interior': {
    key: 'qualidade-do-ar-interior', name: 'Qualidade do Ar Interior', title: 'Avaliação da qualidade do ar interior',
    description: 'Avaliação da qualidade do ar em escritórios, comércio e serviços. Medições, relatório e recomendações da Medisigma para as suas instalações.',
    intro: 'O ar de um escritório faz parte das condições de trabalho de todos os dias. A Medisigma avalia os espaços, realiza as medições adequadas e ajuda a perceber o que pode melhorar no seu edifício.',
    image: { src: '/images/servicos/qualidade-ar-interior.webp', alt: 'Ilustração de uma sala de trabalho com a circulação de ar a partir do sistema de ventilação' },
    action: 'Pedir avaliação do ar interior', scopeTitle: 'Conhecer o ar para decidir o que melhorar',
    scope: ['Começamos pela utilização do edifício, a ocupação e a ventilação, bem como pelo motivo do seu pedido.', 'Escolhemos os espaços e os parâmetros de medição adequados à avaliação.', 'Realizamos as medições e apresentamos os resultados com recomendações para a empresa.'],
    deliverables: ['Avaliação ajustada ao edifício e à sua utilização.', 'Relatório com os parâmetros medidos, as condições e os resultados.', 'Recomendações para orientar melhorias e acompanhamento.'],
    preparation: ['O tipo de edifício e a localização.', 'Como são utilizados os espaços e em que horários.', 'O motivo da avaliação e se existem medições anteriores.'],
    contactTitle: 'Vamos conhecer melhor o ar do seu espaço.',
    contactText: 'Quer avaliar um escritório, uma loja ou um alojamento? Fale-nos do edifício e do que o levou a procurar este serviço. A nossa equipa ajuda a definir a avaliação e responde em até 48 horas úteis.',
    questions: [
      { question: 'Que parâmetros são medidos?', answer: 'Os parâmetros dependem do edifício, da utilização e do objetivo da avaliação. A proposta identifica as medições incluídas. Uma leitura de CO₂, por si só, não caracteriza todos os fatores da qualidade do ar.' },
      { question: 'A avaliação inclui radão?', answer: 'O radão precisa de uma estratégia de medição própria. Se pretende avaliar este risco, escolha Radão no pedido ou diga-nos que precisa de ambos os serviços.' },
      { question: 'O edifício deve estar ocupado durante a medição?', answer: 'As condições devem representar a utilização que se pretende avaliar. A equipa combina consigo os horários e a preparação necessária.' },
    ],
    links: [{ href: '/blog/qualidade-do-ar-interior-como-avaliar/', label: 'Como se avalia a qualidade do ar interior' }, { href: '/servicos/radao/', label: 'Medição de radão nas instalações' }, { href: 'https://apambiente.pt/ar-e-ruido/ar-interior', label: 'Informação da APA sobre o ar interior' }], media: [],
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
