import React from 'react';
import Link from 'next/link';

export function RecruitmentBanner() {
  return <aside aria-label="Recrutamento" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 bg-primary px-8 py-5 text-sm leading-6 text-primary-foreground">
    <p>Quer trabalhar connosco?</p>
    <Link href="/recrutamento/" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">Conhecer as oportunidades de emprego</Link>
  </aside>;
}