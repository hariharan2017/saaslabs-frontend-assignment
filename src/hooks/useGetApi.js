import { useState, useEffect } from "react";

export const useGetApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await fetch(url);
        const apiData = await response.json();
        setData(apiData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, loading, error };
};
