import Image from 'next/image';
import Link from 'next/link';
import { serviceMedia, locationMedia, videoJsonLd, type ServiceMediaId, type ServicePhoto } from '@/lib/service-media';
import { serializeJsonLd } from '@/lib/organization';
import { ServiceVideo } from './video';
import { MediaContactLink } from './contact-link';

function Photo({ photo, compact = false }: { photo: ServicePhoto; compact?: boolean }) {
  return <figure className="min-w-0">
    <div className="overflow-hidden rounded-lg bg-slate-100">
      <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
        sizes={compact ? '(max-width: 640px) 75vw, 260px' : '(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 320px'}
        className={`mx-auto w-auto max-w-full object-contain ${compact ? 'max-h-60' : 'max-h-96'}`} />
    </div>
    <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">{photo.caption}</figcaption>
  </figure>;
}

export function ServiceMediaSection({ id, contactHref = '#cta-section', nationalExample = false }: { id: ServiceMediaId; contactHref?: string; nationalExample?: boolean }) {
  const entry = serviceMedia[id];
  const schema = entry.video && videoJsonLd(entry.video);
  const photos = nationalExample ? entry.photos.slice(0, 1) : entry.photos;
  return <section id={nationalExample ? 'como-trabalhamos' : entry.anchor} aria-labelledby={`${nationalExample ? 'local-' : ''}${id}-title`}
    className="mx-4 my-8 rounded-2xl border border-border bg-white px-5 py-10 sm:px-8 md:mx-8 md:py-14" data-service-media={id}>
    {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />}
    <div className={`mx-auto grid max-w-6xl items-start gap-8 lg:gap-14 ${entry.video ? 'lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]' : 'lg:grid-cols-2'}`}>
      <div className="min-w-0 lg:pt-4">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary">{nationalExample ? 'Veja como trabalhamos' : entry.eyebrow}</p>
        <h2 id={`${nationalExample ? 'local-' : ''}${id}-title`} className="max-w-xl text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">{entry.title}</h2>
        {nationalExample && <p className="mt-4 border-l-2 border-secondary pl-4 text-sm font-medium leading-6 text-muted-foreground">Exemplo de trabalho realizado pela Medisigma em Portugal.</p>}
        <div className="mt-5 max-w-xl space-y-3 text-base leading-7 text-muted-foreground">{entry.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
        <div className="mt-6"><MediaContactLink mediaId={id} serviceKey={entry.serviceKey} href={contactHref}>{entry.cta}</MediaContactLink></div>
        {entry.article && <Link href={entry.article.href} className="mt-4 block text-sm font-medium text-secondary underline underline-offset-4">{entry.article.label}</Link>}
        {nationalExample && <Link href={`${entry.servicePath}#${entry.anchor}`} className="mt-4 block text-sm font-medium text-secondary underline underline-offset-4">Conhecer o serviço de {entry.serviceLabel.toLowerCase()}</Link>}
        {entry.video && photos.length > 0 && <div className={`mt-8 grid gap-4 ${photos.length > 1 ? 'max-w-xl sm:grid-cols-2' : 'max-w-[260px]'}`}>
          {photos.map(p => <Photo key={p.src} photo={p} compact />)}
        </div>}
      </div>
      {entry.video ? <ServiceVideo video={entry.video} serviceKey={entry.serviceKey} /> : <div className={`grid gap-5 ${photos.length > 1 ? 'sm:grid-cols-2' : ''}`}>{photos.map(p => <Photo key={p.src} photo={p} />)}</div>}
    </div>
  </section>;
}

export function LocationServiceMedia({ location }: { location: keyof typeof locationMedia }) {
  return <ServiceMediaSection id={locationMedia[location]} contactHref="#contact-form" nationalExample />;
}

export function AbrantesServiceMedia() {
  return <section id="trabalho-em-abrantes" className="mx-4 my-8 rounded-2xl border border-border bg-white px-5 py-10 sm:px-8 md:mx-8 md:py-14" aria-labelledby="trabalho-em-abrantes-title">
    <div className="mx-auto max-w-6xl">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary">Perto das empresas e das pessoas</p>
      <h2 id="trabalho-em-abrantes-title" className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Trabalho da Medisigma em Abrantes</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Da avaliação de ruído na Sofalca aos exames de atletas do Benfica de Abrantes, conheça alguns exemplos do nosso trabalho no concelho.</p>
      <div className="mt-8 grid items-start gap-10 md:grid-cols-2">
        {(['sofalca-ruido', 'benfica-abrantes'] as const).map(id => {
          const entry = serviceMedia[id];
          const schema = videoJsonLd(entry.video!);
          return <div key={id} className="min-w-0">
            {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />}
            <ServiceVideo video={entry.video!} serviceKey={entry.serviceKey} />
            <div className="mx-auto mt-4 max-w-[360px]"><MediaContactLink mediaId={id} serviceKey={entry.serviceKey} href="#contact-form">{entry.cta}</MediaContactLink></div>
          </div>;
        })}
      </div>
      <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
        {(['ramiro', 'herdade-amarela'] as const).map(id => {
          const entry = serviceMedia[id];
          return <Link key={id} href={`${entry.servicePath}#${entry.anchor}`} className="group flex min-w-0 items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
            <Image src={entry.video!.poster} alt={entry.video!.title} width={720} height={1280} sizes="90px" className="h-40 w-[90px] shrink-0 rounded object-contain" />
            <span className="min-w-0"><span className="block text-xs font-semibold uppercase tracking-wider text-secondary">{entry.eyebrow}</span><span className="mt-2 block text-base font-medium leading-6 text-foreground">{id === 'ramiro' ? 'O testemunho de um restaurante de Abrantes.' : 'Acompanhamento de um alojamento em Abrantes.'}</span><span className="mt-3 block text-sm text-secondary underline underline-offset-4">Ver o exemplo e conhecer o serviço</span></span>
          </Link>;
        })}
      </div>
    </div>
  </section>;
}
