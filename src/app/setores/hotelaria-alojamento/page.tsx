import React from 'react';
import { SectorPage, sectorMetadata } from '@/components/sector-page';

export const metadata = sectorMetadata('hotelaria-alojamento');
export default function Page() { return <SectorPage sectorKey="hotelaria-alojamento" />; }
