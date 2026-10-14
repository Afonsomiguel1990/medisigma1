import React from 'react';
import Link from 'next/link';

const guides = {
  'manutencao-extintores': {
    audience: 'Para empresas, condomínios e responsáveis pela manutenção de instalações.',
    scope: 'Verificamos os equipamentos e identificamos as necessidades de manutenção. O âmbito da intervenção, as substituições e os trabalhos adicionais são definidos nas condições da proposta.',
    deliverable: 'Registo das intervenções e indicação das necessidades identificadas, para apoiar a gestão dos extintores da instalação.',
    preparation: 'Indique o concelho e o número aproximado de extintores. Se os equipamentos estiverem distribuídos por vários edifícios, mencione os locais e as condições de acesso.',
    question: 'Não sei quantos extintores tenho. Posso pedir proposta?', answer: 'Sim. Indique o tipo e a localização das instalações. Uma estimativa ajuda, mas não é obrigatória para iniciar o contacto.',
    links: [{ href: '/faqs/manutencao-extintores/', label: 'Perguntas frequentes sobre manutenção de extintores' }, { href: '/blog/tipos-extintores-classes-fogo-portugal/', label: 'Tipos de extintores e classes de fogo' }],
  },
  'seguranca-alimentar': {
    audience: 'Para restaurantes, alojamentos com refeições, comércio alimentar e outras atividades do setor alimentar.',
    scope: 'Avaliamos a atividade, apoiamos a implementação ou revisão do HACCP e acompanhamos os procedimentos e registos. A visita permite conhecer o funcionamento do estabelecimento e definir as prioridades.',
    deliverable: 'Documentação e procedimentos ajustados à atividade, registos de acompanhamento e identificação das medidas a aplicar, de acordo com o serviço contratado.',
    preparation: 'Indique a atividade, o concelho e o número de estabelecimentos. Diga-nos se já existe um sistema HACCP e se pretende implementá-lo, revê-lo ou ter acompanhamento regular.',
    question: 'Já tenho um dossier HACCP. Preciso de o substituir?', answer: 'A documentação existente deve ser analisada em conjunto com a atividade real. A equipa identifica o que pode ser mantido, atualizado ou complementado antes de definir o acompanhamento.',
    links: [{ href: '/blog/seguranca-restauracao-testemunho-restaurante-o-ramiro/', label: 'A experiência do Restaurante O Ramiro, em Abrantes' }, { href: '/setores/hotelaria-alojamento/', label: 'Serviços para hotelaria e alojamento' }],
  },
};
export function ServiceRequestGuide({ serviceKey }: { serviceKey: keyof typeof guides }) {
  const guide = guides[serviceKey];
  return <section className="mx-auto w-full max-w-6xl px-6 py-12"><p className="mb-6 text-lg leading-7 text-gray-700">{guide.audience}</p><div className="grid gap-8 md:grid-cols-2"><div><h2 className="text-2xl font-semibold">O que fazemos</h2><p className="mt-4 leading-7 text-gray-700">{guide.scope}</p></div><div><h2 className="text-2xl font-semibold">O que recebe</h2><p className="mt-4 leading-7 text-gray-700">{guide.deliverable}</p></div></div><h2 className="mt-10 text-2xl font-semibold">Como preparar o pedido</h2><p className="mt-4 max-w-3xl leading-7 text-gray-700">{guide.preparation}</p><details className="mt-6 rounded-xl border p-5"><summary className="cursor-pointer font-semibold">{guide.question}</summary><p className="mt-4 leading-7 text-gray-700">{guide.answer}</p></details><Link href={`/pedir-proposta/?servico=${serviceKey}`} className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-secondary px-6 py-3 font-semibold text-white">Pedir proposta</Link><ul className="mt-6 space-y-3">{guide.links.map(link => <li key={link.href}><Link href={link.href} className="text-secondary underline underline-offset-4">{link.label}</Link></li>)}</ul></section>;
}
