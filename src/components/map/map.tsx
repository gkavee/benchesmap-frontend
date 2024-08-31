'use client';

import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, Placemark, ZoomControl, GeolocationControl, Button as YMapsButton } from '@pbe/react-yandex-maps';
import { Button } from '@mui/material';
import axios from 'axios';
import AddBenchModal from '@/components/map/add-bench-modal';
import BenchInfoModal from '@/components/map/info-bench-modal';
import { Bench } from '@/types';

interface MapComponentProps {
  initialBenches: Bench[];
}

const MapComponent: React.FC<MapComponentProps> = ({ initialBenches }) => {
  const [benches, setBenches] = useState<Bench[]>(initialBenches);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBench, setSelectedBench] = useState<Bench | null>(null);
  const mapRef = useRef<ymaps.Map>();

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Ошибка при получении местоположения пользователя:", error);
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const handleAddBench = async (newBench: Omit<Bench, 'id'>) => {
    try {
      const response = await axios.post('/api/create_bench', newBench);
      const createdBench = response.data;
      setBenches([...benches, createdBench]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Ошибка при добавлении лавочки:", error);
    }
  };

  const handlePlacemarkClick = (bench: Bench) => {
    setSelectedBench(bench);
  };

  const zoomToNearestBench = async () => {
    if (!userLocation || !mapRef.current) return;

    try {
      const response = await axios.get('/api/nearest_bench', {
        params: { latitude: userLocation[0], longitude: userLocation[1] }
      });
      const nearestBench = response.data;

      mapRef.current.setCenter([nearestBench.latitude, nearestBench.longitude], 15);
    } catch (error) {
      console.error("Ошибка при поиске ближайшей лавочки:", error);
    }
  };

  const zoomToUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.setCenter(userLocation, 15);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <YMaps>
        <Map
          defaultState={{ center: [55.75, 37.57], zoom: 9 }}
          width="100%"
          height="100%"
          instanceRef={(ref) => {
            if (ref) mapRef.current = ref;
          }}
        >
          {benches.map((bench) => (
            <Placemark
              key={bench.id}
              geometry={[bench.latitude, bench.longitude]}
              onClick={() => handlePlacemarkClick(bench)}
            />
          ))}
          {userLocation && (
            <Placemark
              geometry={userLocation}
              options={{
                preset: 'islands#blueCircleDotIcon',
              }}
            />
          )}
          <ZoomControl />
          <GeolocationControl options={{ float: 'left' }} />
          <YMapsButton
            options={{ maxWidth: 128 }}
            data={{ content: 'Моё местоположение' }}
            onClick={zoomToUserLocation}
          />
        </Map>
      </YMaps>
      <Button
        variant="contained"
        onClick={() => setIsAddModalOpen(true)}
        style={{ position: 'absolute', top: 10, left: 10 }}
      >
        Добавить лавочку
      </Button>
      <Button
        variant="contained"
        onClick={zoomToNearestBench}
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        Найти ближайшую лавочку
      </Button>
      <AddBenchModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBench}
        userLocation={userLocation}
      />
      <BenchInfoModal
        bench={selectedBench}
        onClose={() => setSelectedBench(null)}
        userLocation={userLocation}
      />
    </div>
  );
};

export default MapComponent;