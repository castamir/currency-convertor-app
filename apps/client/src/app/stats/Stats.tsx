import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useFetchStats } from '../../__generated__/react';

export const Stats = () => {
  const { data, loading, refetch } = useFetchStats();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Box>
      <Typography variant={'h4'}>Stats</Typography>
      <Button variant="contained" color="secondary" onClick={handleRefresh}>
        Refresh
      </Button>
      {!loading && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Total requests</TableCell>
                <TableCell align="right">Total in USD</TableCell>
                <TableCell>Most popular currency</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && (
                <TableRow>
                  <TableCell align="right">{data.requestCount}</TableCell>
                  <TableCell align="right">
                    ${data.totalAmountInDollars.toFixed(2)}
                  </TableCell>
                  <TableCell>{data.mostPopularDestCurrency}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
