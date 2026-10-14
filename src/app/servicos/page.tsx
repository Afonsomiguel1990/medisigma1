import { Metadata } from "next";
import ServicosClient from "./ServicosClient";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Serviços",
  description: "Soluções completas em segurança e saúde para o seu negócio. Medicina do Trabalho, Segurança no Trabalho, Segurança Alimentar e mais.",
  alternates: {
    canonical: "https://www.medisigma.pt/servicos/",
  },
};

export default function ServicosPage() {
  return <><ServicosClient /><section className="mx-auto w-full max-w-6xl px-6 py-12"><h2 className="text-2xl font-semibold">Serviços por setor</h2><p className="mt-4 text-gray-700">Identifique as necessidades da equipa e das instalações para preparar o pedido.</p><div className="mt-6 grid gap-5 md:grid-cols-2"><Link href="/setores/industria/" className="rounded-xl border p-6 text-xl font-semibold text-secondary">Indústria</Link><Link href="/setores/hotelaria-alojamento/" className="rounded-xl border p-6 text-xl font-semibold text-secondary">Hotelaria e alojamento</Link></div></section></>;
}
