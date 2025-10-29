import { white } from '@/app/app/theme';
import PaintButton from '@/components/ui/paint-button';
import Pixel from '@/components/ui/pixel';
import Window from '@/components/ui/window';
import { ANIMATION_MODE } from '@/configs/const.config';
import { Typography, Stack, Divider } from '@mui/material';
import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useSelector } from 'react-redux';

function Tracker() {
    const [highlight, setHighlight] = useState(null);
    const [selected, setSelected] = useState(null);
    const { mode, frame } = useSelector(s => s.animation);
    const isStatic = mode === ANIMATION_MODE.STATIC;

    useMapEvents({
        click(e) {
            const x = Math.floor(e.latlng.lng);
            const y = Math.floor(e.latlng.lat);
            setSelected({ x, y });
        },
        mousemove(e) {
            const x = Math.floor(e.latlng.lng);
            const y = Math.floor(e.latlng.lat);
            setHighlight({ x, y });
        },
        mouseout() {
            setHighlight(null);
        },
    });

    function handleClose() {
        setSelected(null);
    }

    return (
        <>
            {highlight && <Pixel x={highlight.x} y={highlight.y} c={white} opacity={0.1} b={true} />}
            {selected && <Pixel x={selected.x} y={selected.y} c={white} opacity={0.1} b={true} />}

            {(selected && isStatic) ? (
                <Window close={handleClose}>
                    <Stack spacing={2}>
                        <Typography variant="h6" color="primary" align='center'>
                            Pixel
                        </Typography>
                        <Divider sx={{ width: '100%' }} />
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <Typography variant="body1">
                                <strong>X:</strong> {selected.x}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Y:</strong> {selected.y}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Frame:</strong> {frame}
                            </Typography>
                        </Stack>
                        <Typography variant="body1">
                            <strong>Painted by:</strong> XXX #123123
                        </Typography>
                        <PaintButton />
                    </Stack>
                </Window >
            ) : (
                <PaintButton />
            )
            }
        </>
    );
}

export default Tracker;