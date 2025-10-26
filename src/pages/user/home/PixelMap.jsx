import { MapContainer } from 'react-leaflet';
import L from 'leaflet';
import SectorLayer from './SectorLayer';
import CoordinateNavigator from './CoordinateNavigator';
import env from '@/configs/env.config';
import PixelTracker from './PixelTracker';

const WORLD_DIMENSION = env.canvas_size; // 256,000

// Custom Coordinate Reference System for a flat, square world
const CustomSimpleCRS = L.extend({}, L.CRS.Simple, {
    // We need to adjust the transformation to map our world coordinates correctly.
    // L.Transformation(a, b, c, d) means: x' = a*x + b, y' = c*y + d
    // We want (lng, lat) -> (x, y) where y increases downwards.
    // Leaflet's default Simple CRS flips the y-axis. We will use it as is.
    transformation: new L.Transformation(1, 0, 1, 0),
});

export default function PixelMap() {
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <MapContainer
                crs={CustomSimpleCRS}
                center={[WORLD_DIMENSION / 2, WORLD_DIMENSION / 2]} // Center of our world
                zoom={0} // Start zoomed out to see a larger portion
                minZoom={0} // Allow zooming out further
                maxZoom={9}
                style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }}
                maxBounds={[
                    [0, 0], // Top-left corner
                    [WORLD_DIMENSION, WORLD_DIMENSION], // Bottom-right corner
                ]}
                maxBoundsViscosity={1.0} // Prevent dragging outside the world
                zoomSnap={-0.5} // Controls the snapping of zoom levels (e.g., 0.5 allows half-step zooms)
                zoomDelta={0.25} // Controls the zoom step when using zoom controls or keyboard
            >
                {/* <GridLayer /> */}
                <SectorLayer />
                <CoordinateNavigator />
                <PixelTracker />
            </MapContainer>
        </div>
    );
}
