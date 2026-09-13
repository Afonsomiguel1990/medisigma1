"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import * as CookieConsent from "vanilla-cookieconsent";
import { ramiroTestimonial } from "@/lib/testimonials";

export function FacebookVideo() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setAllowed(CookieConsent.acceptedService("facebook", "marketing"));
    };
    window.addEventListener("cc:onConsent", syncConsent);
    window.addEventListener("cc:onChange", syncConsent);
    syncConsent();
    return () => {
      window.removeEventListener("cc:onConsent", syncConsent);
      window.removeEventListener("cc:onChange", syncConsent);
    };
  }, []);

  function allowFacebook() {
    const services = CookieConsent.getUserPreferences().acceptedServices.marketing || [];
    CookieConsent.acceptService([...new Set([...services, "facebook"])], "marketing");
    setAllowed(CookieConsent.acceptedService("facebook", "marketing"));
  }

  return (
    <figure className="not-prose mx-auto w-full max-w-[360px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-slate-950 shadow-lg">
        {allowed ? (
          <iframe
            src={ramiroTestimonial.embedUrl}
            title="Testemunho do Restaurante O Ramiro sobre a Medisigma"
            width="360"
            height="640"
            className="absolute inset-0 h-full w-full border-0"
            allow="encrypted-media; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={ramiroTestimonial.poster}
              alt="Ramiro durante a entrevista com a equipa Medisigma"
              fill
              sizes="(max-width: 400px) 100vw, 360px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent px-5 py-5">
              <span className="text-sm font-medium text-white">Vídeo · {ramiroTestimonial.durationLabel}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent px-5 pb-6 pt-24 text-white">
              <button
                type="button"
                onClick={allowFacebook}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <Play aria-hidden="true" className="size-4 shrink-0" />
                Permitir Facebook e ver vídeo
              </button>
              <p className="mt-3 text-xs leading-relaxed text-slate-200">
                Este vídeo é alojado no Facebook. Ao permiti-lo, o Facebook pode utilizar cookies.
                Pode alterar esta escolha em &quot;Gerir cookies&quot;.
              </p>
            </div>
          </>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs leading-relaxed text-muted-foreground">
        <a href={ramiroTestimonial.videoUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
          Ver no Facebook
        </a>
        <button type="button" onClick={() => CookieConsent.showPreferences()} className="underline underline-offset-4 hover:text-foreground">
          Gerir cookies
        </button>
      </figcaption>
      <noscript><p>Para ver a entrevista, use a ligação &quot;Ver no Facebook&quot;.</p></noscript>
    </figure>
  );
}
