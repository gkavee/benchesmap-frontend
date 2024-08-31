import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';
import { BenchCreate } from '@/types';

interface AddBenchModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (bench: BenchCreate) => void;
  userLocation: [number, number] | null;
}

const AddBenchModal: React.FC<AddBenchModalProps> = ({ open, onClose, onAdd, userLocation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userLocation) return;

    const newBench: BenchCreate = {
      name,
      description,
      latitude: userLocation[0],
      longitude: userLocation[1],
      count: 1,
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post('/api/create_bench', newBench);
      if (response.status === 201) {
        onAdd(response.data);
        setName('');
        setDescription('');
        onClose();
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error creating bench:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавить новую лавочку</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Название"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <TextField
            margin="dense"
            label="Описание"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>Отмена</Button>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Добавление...' : 'Добавить'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddBenchModal;
