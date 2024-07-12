import { useEffect } from 'react';
import { Box } from '@mui/material';
import { MapContainer, TileLayer} from 'react-leaflet';

const Map = () => {
 
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }, []);

  return (
    <Box sx={{ width: '100%', height: '300px', borderRadius: '4px', overflow: 'hidden' }}>
      <MapContainer center={[-2.170997, -79.922359]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box>
  );
}

export default Map;