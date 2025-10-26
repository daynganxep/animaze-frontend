import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

// This component creates a custom Leaflet GridLayer to draw the pixel grid.
function GridLayer() {
    const map = useMap();

    useEffect(() => {
        const GridLayer = L.GridLayer.extend({
            createTile: function (coords) {
                const tile = L.DomUtil.create('canvas', 'leaflet-tile');
                const size = this.getTileSize();
                tile.width = size.x;
                tile.height = size.y;

                const ctx = tile.getContext('2d');

                // Only draw grid lines at high zoom levels to prevent the screen from being solid gray
                if (coords.z > 4) {
                    // const gridSize = Math.pow(2, coords.z - 8); // Adjust grid size based on zoom
                    const gridSize = 1; // Adjust grid size based on zoom


                    ctx.strokeStyle = 'rgba(128, 128, 128, 0.5)';
                    ctx.beginPath();


                    for (let i = 0; i < size.x; i += gridSize) {
                        ctx.moveTo(i, 0);
                        ctx.lineTo(i, size.y);
                    }

                    for (let i = 0; i < size.y; i += gridSize) {
                        ctx.moveTo(0, i);
                        ctx.lineTo(size.x, i);
                    }
                    ctx.stroke();
                } else {
                    // At low zoom, just show a plain background
                    ctx.fillStyle = '#e9e9e9';
                    ctx.fillRect(0, 0, size.x, size.y);
                }

                return tile;
            }
        });

        const grid = new GridLayer();
        map.addLayer(grid);

        // Cleanup function to remove the layer when the component unmounts
        return () => {
            map.removeLayer(grid);
        };
    }, [map]);

    return null; // This component does not render anything itself
}

export default GridLayer;
