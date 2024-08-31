import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Bench } from '@/types';

interface InfoBenchModalProps {
  bench: Bench | null;
  onClose: () => void;
  userLocation: [number, number] | null;
}

const InfoBenchModal: React.FC<InfoBenchModalProps> = ({ bench, onClose, userLocation }) => {
  if (!bench) return null;

  const handleRouteClick = () => {
    if (!userLocation) {
      alert('Не удалось определить ваше местоположение');
      return;
    }

    const url = `https://yandex.ru/maps/?rtext=${userLocation[0]},${userLocation[1]}~${bench.latitude},${bench.longitude}&rtt=auto`;
    window.open(url, '_blank');
  };

  return (
    <Dialog open={!!bench} onClose={onClose}>
      <DialogTitle>{bench.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{bench.description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
        <Button onClick={handleRouteClick} variant="contained" color="primary">
          Проложить маршрут
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoBenchModal;