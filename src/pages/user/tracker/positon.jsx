import { Typography } from '@mui/material';
import { useState } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

function TrackingPositon() {
    const map = useMap();
    const [position, setPosition] = useState({ x: 0, y: 0, z: map.getZoom() });

    useMapEvents({
        mousemove(e) {
            const x = Math.floor(e.latlng.lng);
            const y = Math.floor(e.latlng.lat);
            setPosition({ x, y, z: map.getZoom() });
        },
        zoom() {
            setPosition(prev => ({ ...prev, z: map.getZoom() }));
        }
    });


    return (
        <Typography className="font-tiny5" color="text.black" fontSize={"large"} fontWeight="bold" variant="body1">
            [ x: {position.x}, y: {position.y}, zoom: {position.z.toFixed(1)} ]
        </Typography>
    );
}

export default TrackingPositon;