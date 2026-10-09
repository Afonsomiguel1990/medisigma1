import Image from 'next/image';
import { ServiceVideo } from '@/components/service-media/video';
import { serviceMedia, videoJsonLd } from '@/lib/service-media';
import { serializeJsonLd } from '@/lib/organization';

// Fixed editorial media: MDX cannot supply sources, props or executable content.
export function NoiseAssessmentMedia() {
  const entry = serviceMedia['sofalca-ruido'];
  const schema = videoJsonLd(entry.video!);
  return <div className="not-prose my-8" data-blog-noise-media>
    {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />}
    <div className="grid grid-cols-2 items-start gap-4 lg:grid-cols-3">
      {entry.photos.map(photo => <figure key={photo.src} className="min-w-0">
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
          sizes="(min-width: 1024px) 288px, (min-width: 640px) 40vw, 45vw"
          className="h-auto w-full rounded-lg" />
        <figcaption className="mt-2 text-sm leading-5 text-gray-600">{photo.caption}</figcaption>
      </figure>)}
      <div className="col-span-2 mx-auto w-full max-w-[320px] lg:col-span-1">
        <ServiceVideo video={entry.video!} serviceKey={entry.serviceKey} />
      </div>
    </div>
  </div>;
}
