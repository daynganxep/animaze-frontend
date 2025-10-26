import { useState } from 'react';
import { useMap, useMapEvents, Rectangle } from 'react-leaflet';

function PixelTracker() {
    const map = useMap();
    const [highlight, setHighlight] = useState(null);
    const [coords, setCoords] = useState({ z: map.getZoom(), x: 0, y: 0 });

    useMapEvents({
        mousemove(e) {
            // For our CRS, lat is y and lng is x
            const x = Math.floor(e.latlng.lng);
            const y = Math.floor(e.latlng.lat);

            // Create bounds for a 1x1 world pixel rectangle
            const bounds = [
                [y, x],       // Top-left corner
                [y + 1, x + 1], // Bottom-right corner
            ];
            setHighlight(bounds);
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
            {/* The black highlight square */}
            {highlight && (
                <Rectangle
                    bounds={highlight}
                    pathOptions={{ color: 'black', weight: 0, fillOpacity: 0.6 }}
                />
            )}

            {/* The coordinate display */}
            <div style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                zIndex: 1001, // Ensure it's above the map
                fontSize: '1em',
                fontFamily: 'monospace'
            }}>
                z:{coords.z}, x:{coords.x}, y:{coords.y}
            </div>
        </>
    );
}

export default PixelTracker;
