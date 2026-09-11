import { useState, useEffect, useCallback } from 'react';
import API_BASE_URL from '../config/api';

const CHECK_INTERVAL_MS = 10000; // verifica a cada 10 segundos

export function useApiStatus() {
  const [online, setOnline] = useState(true);
  const [checando, setChecando] = useState(true);

  const verificar = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000); // timeout de 4s

      const response = await fetch(`${API_BASE_URL}/`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);

      setOnline(response.ok);
    } catch {
      setOnline(false);
    } finally {
      setChecando(false);
    }
  }, []);

  useEffect(() => {
    verificar(); // verifica imediatamente ao montar

    const intervalo = setInterval(verificar, CHECK_INTERVAL_MS);
    return () => clearInterval(intervalo);
  }, [verificar]);

  return { online, checando, verificar };
}
