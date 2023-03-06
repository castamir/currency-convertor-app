import React from 'react';
import { fetchStats, StatsResponse } from './api';

// since hooks like this are repetitive, they can be generated as well
export function useFetchStats() {
  const [data, setData] = React.useState<StatsResponse | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);

  const fetchData = React.useCallback(() => {
    fetchStats()
      .then((response) => {
        setData(response);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setData, setLoading, setError]);

  React.useEffect(() => {
    fetchData();
  }, [setData, setLoading, setError, fetchData]);

  return { data, loading, error, refetch: fetchData };
}
