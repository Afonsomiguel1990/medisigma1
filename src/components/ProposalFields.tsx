'use client';

import React, { useEffect, useState } from 'react';
import { proposalQuestions } from '@/lib/proposal';

export function ProposalFields({ id, service, inputClass }: { id: string; service: string; inputClass: string }) {
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);
  const questions = proposalQuestions(service);
  const counts = [
    { name: 'numero_trabalhadores', label: 'Número de trabalhadores', hint: 'Para Medicina do Trabalho e Segurança no Trabalho.', show: questions.workers },
    { name: 'numero_estabelecimentos', label: 'Número de estabelecimentos', hint: 'Para HACCP, Controlo de Pragas e Segurança Contra Incêndios.', show: questions.sites },
    { name: 'numero_extintores', label: 'Número aproximado de extintores', hint: 'Para Manutenção de Extintores.', show: questions.extinguishers },
  ];
  return <fieldset className="space-y-4 rounded-lg bg-slate-50 p-4">
    <legend className="px-1 text-sm font-semibold text-gray-900">Dados para a proposta, todos opcionais</legend>
    <div>
      <label htmlFor={`${id}-concelho`} className="mb-2 block text-sm font-medium">Concelho</label>
      <input id={`${id}-concelho`} name="concelho" maxLength={200} autoComplete="address-level2" className={inputClass} />
    </div>
    <div>
      <label htmlFor={`${id}-nif`} className="mb-2 block text-sm font-medium">NIF da empresa</label>
      <input id={`${id}-nif`} name="nif" inputMode="numeric" pattern="[0-9]{9}" maxLength={9} aria-describedby={`${id}-nif-help`} className={inputClass} />
      <p id={`${id}-nif-help`} className="mt-1 text-xs text-gray-600">Se indicar um NIF português, use os 9 algarismos.</p>
    </div>
    {counts.map(field => <div key={field.name} hidden={enhanced && !field.show}>
      <label htmlFor={`${id}-${field.name}`} className="mb-2 block text-sm font-medium">{field.label}</label>
      <input id={`${id}-${field.name}`} name={field.name} type="number" inputMode="numeric" min={1} max={1000000} step={1} disabled={enhanced && !field.show} aria-describedby={`${id}-${field.name}-help`} className={inputClass} />
      <p id={`${id}-${field.name}-help`} className="mt-1 text-xs text-gray-600">{field.hint} Pode indicar uma estimativa.</p>
    </div>)}
  </fieldset>;
}
