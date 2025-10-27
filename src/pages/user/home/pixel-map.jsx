import { MapContainer } from 'react-leaflet';
import L from 'leaflet';
import SectorLayer from './sector-layer';
import CoordinateNavigator from './coordinate-navigator';
import env from '@/configs/env.config';
import PixelTracker from './pixel-tracker';
import { Stack } from '@mui/material';
import Account from './account';
import CustomZoomControl from './zoom-control';
import ViewControl from './view-control';

const WORLD_DIMENSION = env.canvas_size;

const CustomSimpleCRS = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1, 0, 1, 0),
});

export default function PixelMap() {
    return (
        <Stack position="relative" width="100vw" height="100vh">
            <MapContainer
                crs={CustomSimpleCRS}
                center={[WORLD_DIMENSION / 2, WORLD_DIMENSION / 2]}
                zoom={0}
                minZoom={0}
                maxZoom={9}
                style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }}
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
                    <PixelTracker />
                </Stack>
                <SectorLayer />
            </MapContainer>
        </Stack>
    );
}
