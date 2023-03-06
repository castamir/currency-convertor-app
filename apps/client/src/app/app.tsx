import Box from '@mui/material/Box';
import { Converter } from './converter/Converter';
import { Stats } from './stats/Stats';

export function App() {
  return (
    <Box>
      <Converter />
      <Stats />
    </Box>
  );
}

export default App;
