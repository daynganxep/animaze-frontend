import { useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents, Rectangle } from 'react-leaflet';
import L from 'leaflet';
import { Button, Tooltip } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';

// Component for the location button
function LocationButton() {
    const map = useMap();

    const handleClick = () => {
        map.locate().on("locationfound", function (e) {
            map.flyTo(e.latlng, 16);
        }).on("locationerror", function (e) {
            console.error("Location access denied.", e);
            alert("Location access denied. Please allow location access in your browser settings.");
        });
    };

    return (
        <Tooltip title="Zoom to my location">
            <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                    position: 'absolute',
                    top: 80,
                    right: 10,
                    zIndex: 1000,
                    backgroundColor: 'white',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: '#f4f4f4'
                    }
                }}
            >
                <MyLocationIcon />
            </Button>
        </Tooltip>
    );
}

// Component to highlight the world pixel under the cursor
function PixelHighlighter() {
    const [highlight, setHighlight] = useState(null);
    const map = useMap();

    useMapEvents({
        mousemove(e) {
            // Get the world coordinates from the mouse event
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            // Calculate the bounds of the 1x1 world pixel
            // We floor the coordinates to get the top-left corner of the pixel
            const x = Math.floor(lng);
            const y = Math.floor(lat);

            const bounds = L.latLngBounds([
                [y, x],       // South-West corner
                [y + 1, x + 1]  // North-East corner
            ]);
            setHighlight(bounds);
        },
        mouseout() {
            setHighlight(null);
        },
    });

    if (!highlight) {
        return null;
    }

    return <Rectangle
        bounds={highlight}
        pathOptions={{ color: 'blue', weight: 0.5, fillOpacity: 0.2 }}
    />
}

export default function Map() {
    const [position, setPosition] = useState([51.505, -0.09]); // Default position (London)

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100vh", width: "100%" }}
            zoomSnap={0.1}
            zoomDelta={0.5}
            wheelPxPerZoomLevel={120}
        >
            <TileLayer
                attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
            />
            <LocationButton />
            <PixelHighlighter />
        </MapContainer>
    );
}