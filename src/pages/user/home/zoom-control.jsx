import { IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import L from "leaflet";

export default function CustomZoomControl() {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) L.DomEvent.disableClickPropagation(ref.current);
    }, []);

    const map = useMap();

    const handleZoomIn = () => {
        if (map && map._loaded) map.zoomIn();
    };

    const handleZoomOut = () => {
        if (map && map._loaded) map.zoomOut();
    };


    return (
        <Stack ref={ref} spacing={1}>
            <IconButton
                size="small"
                onClick={handleZoomIn}
            >
                <AddIcon />
            </IconButton>
            <IconButton
                size="small"
                onClick={handleZoomOut}
            >
                <RemoveIcon />
            </IconButton>
        </Stack>
    );
}
