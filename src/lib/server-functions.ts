import { Bench } from '@/types';

export async function getBenches(): Promise<Bench[]> {
  const res = await fetch(`${process.env.API_BASE_URL}/benches`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error('Failed to fetch benches');
  }
  return res.json();
}