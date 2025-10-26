import { useState } from 'react';
import { useMap } from 'react-leaflet';

function CoordinateNavigator() {
    const map = useMap();
    const [coords, setCoords] = useState({ z: map.getZoom(), x: 0, y: 0 });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCoords(prev => ({ ...prev, [name]: Number(value) }));
    };

    const handleMove = () => {
        const { z, x, y } = coords;
        // For our CRS, lat is y and lng is x
        map.setView([y, x], z);
    };

    return (
        <div style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            borderRadius: '5px',
            zIndex: 1001, // Ensure it's above the map
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
        }}>
            <input type="number" name="z" value={coords.z} onChange={handleInputChange} placeholder="Zoom" style={{ width: '50px' }} />
            <input type="number" name="x" value={coords.x} onChange={handleInputChange} placeholder="X" style={{ width: '80px' }} />
            <input type="number" name="y" value={coords.y} onChange={handleInputChange} placeholder="Y" style={{ width: '80px' }} />
            <button onClick={handleMove}>Move</button>
        </div>
    );
}

export default CoordinateNavigator;
