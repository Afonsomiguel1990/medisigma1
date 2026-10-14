import React from 'react';
import { ServiceAreaPage, serviceAreaMetadata } from '@/components/service-area-page';

export const metadata = serviceAreaMetadata('portalegre');
export default function AreaPage() { return <ServiceAreaPage areaKey="portalegre" />; }
