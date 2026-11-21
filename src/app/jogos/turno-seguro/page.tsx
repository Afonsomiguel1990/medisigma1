import type { Metadata } from 'next';
import TurnoSeguro from './turno-seguro';

const title = 'Turno Seguro';
const description = 'Joga três missões de segurança no trabalho, extintores e segurança alimentar e deixa as tuas iniciais no quadro de recordes da Medisigma.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/jogos/turno-seguro/' },
  openGraph: { title, description, url: '/jogos/turno-seguro/' },
};

export default function TurnoSeguroPage() {
  return <TurnoSeguro />;
}
