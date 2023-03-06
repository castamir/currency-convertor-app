import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useFetchStats } from '../../__generated__/react';

export const Stats = () => {
  const { data, loading } = useFetchStats();

  return (
    <Box>
      <Typography>Stats</Typography>
      {!loading && (
        <table>
          <tr>
            <th>Total requests</th>
            <th>Total in USD</th>
            <th>Most popular currency</th>
          </tr>
          {data && (
            <tr>
              <td>{data.requestCount}</td>
              <td>${data.totalAmountInDollars.toFixed(2)}</td>
              <td>{data.mostPopularDestCurrency}</td>
            </tr>
          )}
        </table>
      )}
    </Box>
  );
};
