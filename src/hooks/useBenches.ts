'use client';

import { useState, useCallback } from 'react';
import { Bench } from '@/types';

export const useBenches = (initialBenches: Bench[]) => {
  const [benches, setBenches] = useState<Bench[]>(initialBenches);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshBenches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/benches');
      if (!response.ok) {
        throw new Error('Failed to fetch benches');
      }
      const data = await response.json();
      setBenches(data);
    } catch (err) {
      setError('Failed to fetch benches');
    } finally {
      setLoading(false);
    }
  }, []);

  return { benches, loading, error, refreshBenches };
};