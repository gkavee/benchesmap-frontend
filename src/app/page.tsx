import React from 'react';
import { getBenches } from '@/lib/server-functions';
import MapComponent from '@/components/map/map';
import HomeContent from '@/components/home/home-content';

export default async function Home() {
  const initialBenches = await getBenches();

  return (
    <>
      <HomeContent />
      <MapComponent initialBenches={initialBenches} />
    </>
  );
}