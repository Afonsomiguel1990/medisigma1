import React from 'react';
import { TechnicalServicePage, technicalServiceMetadata } from '@/components/technical-service-page';

export const metadata = technicalServiceMetadata('legionella');
export default function ServicePage() {
  return <TechnicalServicePage serviceKey="legionella" />;
}
