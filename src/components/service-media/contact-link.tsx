'use client';

import { ArrowUpRight } from 'lucide-react';
import type { ServiceMediaId } from '@/lib/service-media';
import { trackServiceMedia } from '@/lib/analytics/client';

export function MediaContactLink({ mediaId, serviceKey, href, children }: { mediaId: ServiceMediaId; serviceKey: string; href: string; children: React.ReactNode }) {
  return <a href={href} data-service-media-cta={mediaId} onClick={() => {
    window.dispatchEvent(new CustomEvent('medisigma:media-contact', { detail: { mediaId } }));
    trackServiceMedia('service_media_cta', mediaId, serviceKey);
  }} className="inline-flex min-h-12 max-w-full items-center justify-center gap-3 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold leading-6 text-white transition-colors hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
    <span>{children}</span><ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
  </a>;
}
