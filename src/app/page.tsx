import React from 'react';
import { getBenches } from '@/lib/api';
import MapComponent from '@/components/map/map';
import HomeContent from '@/components/home/home-content';
import AuthModalWrapper from '@/components/auth/auth-modal-wrapper';

export default async function Home() {
  const initialBenches = await getBenches();

  return (
    <>
      <HomeContent />
      <AuthModalWrapper />
      <MapComponent initialBenches={initialBenches} />
    </>
  );
}