import React from 'react';
import { ServiceAreaPage, serviceAreaMetadata } from '@/components/service-area-page';

export const metadata = serviceAreaMetadata('torres-novas');
export default function AreaPage() { return <ServiceAreaPage areaKey="torres-novas" />; }
