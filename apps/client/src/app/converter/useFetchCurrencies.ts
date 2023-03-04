import React from 'react';
import { fetchCurrencies } from '../../__generated__/api';

export function useFetchCurrencies() {
  const [data, setData] = React.useState<{ value: string }[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetchCurrencies()
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setData, setLoading, setError]);

  return { data, loading, error };
}
