import Pixel from '@/components/ui/pixel';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

function PixelTracker() {
    const map = useMap();
    const [highlight, setHighlight] = useState(null);
    const [coords, setCoords] = useState({ z: map.getZoom(), x: 0, y: 0 });

    useMapEvents({
        mousemove(e) {
            const x = Math.floor(e.latlng.lng);
            const y = Math.floor(e.latlng.lat);
            setHighlight({ x, y });
            setCoords({ z: map.getZoom(), x, y });
        },
        mouseout() {
            setHighlight(null);
        },
        zoomend() {
            setCoords(prev => ({ ...prev, z: map.getZoom() }));
        }
    });

    return (
        <>
            {highlight && <Pixel x={highlight.x} y={highlight.y} />}


            <Box
                padding={2}
                color={'ButtonText'}
                bgcolor={"Window"}
                borderRadius={10}
            >
                <Typography variant="body2" component="div">
                    z:{coords.z} . x:{coords.x} . y:{coords.y}
                </Typography>
            </Box>
        </>
    );
}

export default PixelTracker;
