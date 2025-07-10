'use client';
import { useEffect, useState } from 'react';

export default function ClientTime({ date }: { date: Date }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <span>Last saved: {new Date(date).toLocaleTimeString()}</span>;
}
