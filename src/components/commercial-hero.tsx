import Image from 'next/image';
import Link from 'next/link';

export type CommercialHeroImage = { src: string; alt: string; position?: string };

export function CommercialHero({ title, intro, image, action, sectionLink }: {
  title: string; intro: string; image: CommercialHeroImage;
  action: { href: string; label: string };
  sectionLink?: { href: string; label: string };
}) {
  return <section className="mx-4 my-6 overflow-hidden rounded-2xl bg-[#f2f5f2] sm:mx-8 md:my-8" data-commercial-hero>
    <div className="grid items-stretch lg:grid-cols-[1.05fr_1fr]">
      <div className="flex flex-col items-start justify-center px-6 py-8 sm:px-9 sm:py-10 lg:py-14">
        {sectionLink && <Link href={sectionLink.href} className="mb-5 text-sm font-medium text-slate-700 underline decoration-slate-400 underline-offset-4 hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">{sectionLink.label}</Link>}
        <h1 className="max-w-xl text-[2rem] font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-[2.7rem] lg:text-[3.1rem]">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">{intro}</p>
        <Link href={action.href} className="mt-7 inline-flex min-h-12 items-center justify-center rounded-lg bg-secondary px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">{action.label}</Link>
      </div>
      <div className="relative aspect-[4/3] min-w-0 lg:aspect-auto lg:min-h-[470px]">
        <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 1023px) 92vw, 600px" className="object-cover" style={{ objectPosition: image.position || 'center' }} />
      </div>
    </div>
  </section>;
}
