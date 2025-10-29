import { MapContainer } from 'react-leaflet';
import L from 'leaflet';
import SectorLayer from './sector-layer';
import CoordinateNavigator from './coordinate-navigator';
import PixelTracker from './pixel-tracker';
import { Stack } from '@mui/material';
import Account from './account';
import CustomZoomControl from './zoom-control';
import ViewControl from './view-control';
import { WORLD_DIMENSION } from '@/configs/env.config';
import { useSelector } from 'react-redux';
import PaintMode from './paint-mode';
import { white } from '@/app/app/theme';
import { MAX_ZOOM, MIN_ZOOM } from '@/configs/const.config';

const CustomSimpleCRS = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1, 0, 1, 0),
});

export default function PixelMap() {
    const { paintMode } = useSelector(s => s.ui);

    return (
        <Stack position="relative" width="100vw" height="100vh"
        >
            <MapContainer
                crs={CustomSimpleCRS}
                center={[WORLD_DIMENSION / 2, WORLD_DIMENSION / 2]}
                zoom={0}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
                style={{ width: '100%', height: '100%', backgroundColor: white }}
                maxBounds={[
                    [0, 0],
                    [WORLD_DIMENSION, WORLD_DIMENSION],
                ]}
                maxBoundsViscosity={1.0}
                zoomSnap={-0.5}
                zoomDelta={0.25}
                zoomControl={false}
            >
                <Stack direction="column" position="absolute" top={0} left={0} padding={2} spacing={2} zIndex={1001} >
                    <CustomZoomControl></CustomZoomControl>
                </Stack>
                <Stack direction="column" position="absolute" top={0} right={0} padding={2} spacing={2} zIndex={1001} >
                    <Account />
                    <CoordinateNavigator />
                    <ViewControl></ViewControl>
                </Stack>
                <Stack direction="row" position="absolute" bottom={0} padding={2} zIndex={1001} width="100%" justifyContent="center">
                    {paintMode ?
                        <PaintMode /> :
                        <PixelTracker />
                    }
                </Stack>
                <SectorLayer />
            </MapContainer>
        </Stack>
    );
}
