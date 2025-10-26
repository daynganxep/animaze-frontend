import { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Button, Tooltip } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';

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

export default function Map() {
    const [position, setPosition] = useState([51.505, -0.09]);

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100vh", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationButton />
        </MapContainer>
    );
}