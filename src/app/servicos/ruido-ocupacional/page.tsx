import React from 'react';
import { TechnicalServicePage, technicalServiceMetadata } from '@/components/technical-service-page';

export const metadata = technicalServiceMetadata('ruido-ocupacional');
export default function ServicePage() {
  return <TechnicalServicePage serviceKey="ruido-ocupacional" />;
}
