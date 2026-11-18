import React from 'react';
import { TechnicalServicePage, technicalServiceMetadata } from '@/components/technical-service-page';

export const metadata = technicalServiceMetadata('radao');
export default function ServicePage() {
  return <TechnicalServicePage serviceKey="radao" />;
}
