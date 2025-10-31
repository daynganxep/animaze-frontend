import { IconButton, Stack, Tooltip } from '@mui/material';
import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import L from "leaflet";
import { Minus, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CustomZoomControl() {
    const { t } = useTranslation();
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) L.DomEvent.disableClickPropagation(ref.current);
    }, []);

    const map = useMap();

    const handleZoomIn = () => {
        if (map && map._loaded) map.zoomIn(0.5);
    };

    const handleZoomOut = () => {
        if (map && map._loaded) map.zoomOut(0.5);
    };


    return (
        <Stack ref={ref} spacing={1}>
            <Tooltip arrow placement="right" title={t("ui.zoom-in")}>
                <IconButton
                    size="small"
                    onClick={handleZoomIn}
                >
                    <Plus />
                </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title={t("ui.zoom-out")}>
                <IconButton
                    size="small"
                    onClick={handleZoomOut}
                >
                    <Minus />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}
