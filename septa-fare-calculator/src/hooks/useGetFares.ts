import { useState, useEffect } from "react";

export const useGetFares = (url: string) => {
  const [fares, setFares] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getFares = async () => {
      setLoading(true);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const json = await response.json();
        setFares(json);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    getFares();
  }, [url]);

  return { fares, loading, error };
};
