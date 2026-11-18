import React from 'react';
import { TechnicalServicePage, technicalServiceMetadata } from '@/components/technical-service-page';

export const metadata = technicalServiceMetadata('qualidade-do-ar-interior');
export default function ServicePage() {
  return <TechnicalServicePage serviceKey="qualidade-do-ar-interior" />;
}
