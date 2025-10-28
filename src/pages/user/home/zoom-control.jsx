import { IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMap } from 'react-leaflet';

export default function CustomZoomControl() {
    const map = useMap();

    const handleZoomIn = () => {
        if (map && map._loaded) map.zoomIn();
    };

    const handleZoomOut = () => {
        if (map && map._loaded) map.zoomOut();
    };


    return (
        <Stack spacing={1}>
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
