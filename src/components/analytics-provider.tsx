'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GA_ID, canTrack, hasConsent, initializeGA, observePath, subscribeConsent, suspendAnalytics } from '@/lib/analytics/client';
import { publicPath } from '@/lib/analytics/attribution';
export function AnalyticsProvider() {
  const consent = useSyncExternalStore(subscribeConsent, hasConsent, () => false);
  const path = usePathname();
  const [prepared, setPrepared] = useState(false);
  const enabled = consent && canTrack() && !!publicPath(path);
  useEffect(() => {
    if (enabled) { initializeGA(); observePath(path); setPrepared(true); }
    else { suspendAnalytics(); setPrepared(false); }
  }, [enabled, path]);
  // Prepare the command queue before downloading the Google tag.
  if (!enabled || !prepared) return null;
  const beforeSend = <T extends { url: string }>(event: T): T | null => {
    const safePath = publicPath(event.url);
    return canTrack() && safePath ? { ...event, url: window.location.origin + safePath } : null;
  };
  return <>
    <Script id="consented-google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} onReady={initializeGA} />
    <Analytics beforeSend={beforeSend} />
    <SpeedInsights beforeSend={beforeSend} />
  </>;
}
