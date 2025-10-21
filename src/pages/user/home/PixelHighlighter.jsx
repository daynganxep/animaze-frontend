import { MapContainer, TileLayer, useMapEvents, Rectangle } from 'react-leaflet';
import L from 'leaflet';
import { useState } from 'react';

const CANVAS_SIZE = 256000;

const CRS256 = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1, 0, -1, CANVAS_SIZE),
    projection: L.Projection.LonLat,
    scale: (zoom) => Math.pow(2, zoom),
    zoom: (scale) => Math.log(scale) / Math.LN2,
    infinite: false,
});

function PixelHighlighter() {
    const [highlight, setHighlight] = useState(null);

    useMapEvents({
        mousemove(e) {
            const x = Math.floor(e.latlng.lng);
            const y = Math.floor(e.latlng.lat);

            const bounds = [
                [y, x],
                [y + 1, x + 1],
            ];
            setHighlight(bounds);
        },
        mouseout() {
            setHighlight(null);
        },
    });

    if (highlight) {
        return <Rectangle
            bounds={highlight}
            pathOptions={{ color: 'blue', weight: 0, fillOpacity: 0.6 }}
        />
    }
    return <></>
}

export default function PixelMap() {
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <MapContainer
                crs={CRS256}
                center={[CANVAS_SIZE / 2, CANVAS_SIZE / 2]}
                zoom={0}
                minZoom={0}
                maxZoom={20}
                style={{ width: '100%', height: '100%' }}
                maxBounds={[
                    [0, 0],
                    [CANVAS_SIZE, CANVAS_SIZE],
                ]}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    noWrap={true}
                />
                <PixelHighlighter />
            </MapContainer>
        </div>
    );
}
