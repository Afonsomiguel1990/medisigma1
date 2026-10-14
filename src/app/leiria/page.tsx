import React from 'react';
import { ServiceAreaPage, serviceAreaMetadata } from '@/components/service-area-page';

export const metadata = serviceAreaMetadata('leiria');
export default function AreaPage() { return <ServiceAreaPage areaKey="leiria" />; }
