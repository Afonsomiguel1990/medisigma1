'use client';

import { useRef, useState } from 'react';
import type { ServiceVideoData } from '@/lib/service-media';
import { trackServiceMedia } from '@/lib/analytics/client';

export function ServiceVideo({ video, serviceKey }: { video: ServiceVideoData; serviceKey: string }) {
  const started = useRef(false);
  const completed = useRef(false);
  const [failed, setFailed] = useState(false);
  return <figure className="mx-auto w-full min-w-0 max-w-[360px]" data-service-video={video.id}>
    <div className="overflow-hidden rounded-xl bg-slate-950">
      <video width={720} height={1280} controls playsInline preload="none" poster={video.poster} aria-label={video.title}
        className="aspect-[9/16] h-auto w-full object-contain" onError={() => setFailed(true)}
        onPlay={() => { if (!started.current && trackServiceMedia('service_video_start', video.id, serviceKey)) started.current = true; }}
        onEnded={() => { if (!completed.current && trackServiceMedia('service_video_complete', video.id, serviceKey)) completed.current = true; }}>
        <source src={video.src} type="video/mp4" />
        <track kind="captions" src={video.captions} srcLang="pt-PT" label="Português" default />
        O seu navegador não suporta este vídeo. Use a ligação abaixo para o abrir.
      </video>
    </div>
    <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
      <span className="block font-medium text-foreground">{video.title}</span>
      <span>{video.durationLabel} · </span><a href={video.src} className="underline underline-offset-4 hover:text-foreground">Abrir vídeo</a>
      {failed && <p role="status" className="mt-2">Não foi possível carregar o vídeo. Pode tentar abri-lo diretamente ou ler o texto abaixo.</p>}
      {video.transcript && <details className="mt-3 border-t border-border pt-3">
        <summary className="cursor-pointer font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">Ler transcrição</summary>
        <p className="mt-3 whitespace-pre-line">{video.transcript}</p>
      </details>}
    </figcaption>
  </figure>;
}
