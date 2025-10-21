import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import KonvaPixelLayer from './konva-pixel-layer';
import env from '@/configs/env.config';

const WORLD_DIMENSION = env.canvas_size; // e.g., 2560000

// Custom CRS where 1 Leaflet pixel = 1 world pixel at zoom 0
export const CustomSimpleCRS = L.extend({}, L.CRS.Simple, {
    // Transformation to ensure y increases downwards and origin is top-left
    transformation: new L.Transformation(1, 0, 1, 0),
});

function MapContainerComponent() {
    // Center the map at the middle of our world
    const center = [WORLD_DIMENSION / 2, WORLD_DIMENSION / 2];
    // Initial zoom level for Leaflet. 
    // At zoom 0, 1 Leaflet pixel = 1 world pixel.
    // So, at zoom 0, the entire WORLD_DIMENSION x WORLD_DIMENSION is the map size.
    const zoom = 0; 

    // URL for a flat, non-geographic world map image
    // This is a placeholder. You might want to replace it with a custom-designed map.
    const flatWorldMapImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/8/83/World_map_blank_without_borders.png';

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            minZoom={0}
            maxZoom={18} // Max zoom for Leaflet, adjust as needed
            crs={CustomSimpleCRS} // Use our custom CRS
            maxBounds={[[0, 0], [WORLD_DIMENSION, WORLD_DIMENSION]]} // Constrain view to our world
            maxBoundsViscosity={1.0} // Prevent dragging outside bounds
            style={{ height: '100vh', width: '100vw', backgroundColor: '#f0f0f0' }} // Set a background color
        >
            {/* Use ImageOverlay for a flat, non-geographic background map */}
            <ImageOverlay
                url={flatWorldMapImageUrl}
                bounds={[[0, 0], [WORLD_DIMENSION, WORLD_DIMENSION]]} // Image covers our entire world dimension
            />
            <KonvaPixelLayer />
        </MapContainer>
    );
}

export default MapContainerComponent;