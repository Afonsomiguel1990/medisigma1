import type { Metadata } from 'next';
import Link from 'next/link';
import { RESOURCES } from '@/lib/resources/catalog';
export const metadata: Metadata = { title: 'Recursos para empresas', robots: { index: false, follow: true }, description: 'Listas e folhas de trabalho para organizar a segurança e a saúde na sua empresa.', alternates: { canonical: 'https://www.medisigma.pt/recursos/' } };
export default function ResourcesPage() {
  return <main className="px-8 py-20"><h1 className="text-4xl font-bold mb-6">Recursos para empresas</h1><p className="max-w-2xl text-lg mb-10">Listas e folhas de trabalho para ajudar a organizar a segurança e a saúde na sua empresa. Escolha o recurso e preencha os dados para obter o ficheiro.</p><div className="grid gap-6 md:grid-cols-2">{RESOURCES.map(resource => <article className="rounded-xl border p-6" key={resource.slug}><p className="text-sm text-muted-foreground mb-3">{resource.format}</p><h2 className="text-xl font-semibold mb-3"><Link href={`/recursos/${resource.slug}/`}>{resource.title}</Link></h2><p className="mb-5">{resource.description}</p><Link className="font-semibold text-secondary underline" href={`/recursos/${resource.slug}/`}>Obter recurso</Link></article>)}</div></main>;
}
