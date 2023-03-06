import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Converter } from './converter/Converter';
import { Stats } from './stats/Stats';

export function App() {
  return (
    <Box sx={{ width: 500 }}>
      <Stack spacing={2}>
        <Converter />
        <Stats />
      </Stack>
    </Box>
  );
}

export default App;
