'use client';

import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useBenches } from '@/hooks/useBenches';
import { Bench } from '@/types';
import { Button } from '@mui/material';

interface MapComponentProps {
  initialBenches: Bench[];
}

const MapComponent: React.FC<MapComponentProps> = ({ initialBenches }) => {
  const { benches, loading, error, refreshBenches } = useBenches(initialBenches);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <YMaps query={{ apikey: process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY }}>
        <Map
          defaultState={{ center: [55.75, 37.57], zoom: 9 }}
          width="100%"
          height="700px"
        >
          {benches.map((bench: Bench) => (
            <Placemark
              key={bench.id}
              geometry={[bench.latitude, bench.longitude]}
              properties={{
                balloonContentBody: `Bench ID: ${bench.id}`,
              }}
            />
          ))}
        </Map>
      </YMaps>
      <Button onClick={refreshBenches} variant="contained" sx={{ mt: 2 }}>
        Refresh Benches
      </Button>
    </>
  );
};

export default MapComponent;