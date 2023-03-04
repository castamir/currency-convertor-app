import React from 'react';
import {
  convertCurrencies,
  ConvertCurrenciesArgs,
  ConvertCurrenciesResponse,
} from '../../__generated__/api';

export function useConvertCurrencies() {
  const [data, setData] = React.useState<ConvertCurrenciesResponse | undefined>(
    undefined
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(
    (args: ConvertCurrenciesArgs) => {
      setLoading(true);
      convertCurrencies(args)
        .then((response) => {
          setData(response);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setData, setLoading, setError]
  );

  return {
    handleSubmit,
    data,
    loading,
    error,
  };
}
