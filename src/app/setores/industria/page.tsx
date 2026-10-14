import React from 'react';
import { SectorPage, sectorMetadata } from '@/components/sector-page';

export const metadata = sectorMetadata('industria');
export default function Page() { return <SectorPage sectorKey="industria" />; }
