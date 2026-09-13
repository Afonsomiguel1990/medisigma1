import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getResource, RESOURCES } from '@/lib/resources/catalog';
import ResourceAccessForm from '@/components/ResourceAccessForm';
export function generateStaticParams() { return RESOURCES.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resource = getResource((await params).slug);
  return resource ? { title: resource.title, description: resource.description, robots: { index: false, follow: true }, alternates: { canonical: `https://www.medisigma.pt/recursos/${resource.slug}/` } } : {};
}
export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const resource = getResource((await params).slug);
  if (!resource) notFound();
  return <main className="px-8 py-20"><Link className="text-sm underline" href="/recursos/">Todos os recursos</Link><div className="grid md:grid-cols-2 gap-10 mt-8"><div><p className="text-sm text-muted-foreground mb-3">Recurso em {resource.format}</p><h1 className="text-4xl font-bold mb-6">{resource.title}</h1><p className="text-lg mb-6">{resource.description}</p><p className="text-sm text-muted-foreground">Material de apoio à organização da empresa. Deve ser adaptado à instalação e à avaliação dos técnicos responsáveis.</p></div><ResourceAccessForm resource={resource} /></div></main>;
}
