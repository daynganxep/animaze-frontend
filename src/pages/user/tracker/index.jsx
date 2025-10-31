import { white } from '@/app/app/theme';
import PaintButton from '@/components/ui/paint-button';
import Pixel from '@/components/ui/pixel';
import Window from '@/components/ui/window';
import { ANIMATION_MODE } from '@/configs/const.config';
import toast from '@/hooks/toast';
import { useSectorsCache } from '@/hooks/use-sectors-cache';
import AccountService from '@/services/account.service';
import { Typography, Stack, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useSelector } from 'react-redux';
import PaintedAccount from './painted-account';
import { useTranslation } from 'react-i18next';
import { NULL_COLOR_INDEX } from '@/tools/data.tool';

function Tracker() {
    const { t } = useTranslation();
    const [highlight, setHighlight] = useState(null);
    const [selected, setSelected] = useState(null);
    const { mode, frame } = useSelector(s => s.animation);
    const [selectedAccount, setSelectedAccount] = useState(null)
    const isStatic = mode === ANIMATION_MODE.STATIC;
    const sectorsCache = useSectorsCache();

    useMapEvents({
        click(e) {
            const x = Math.floor(e.latlng.lng);
            const y = Math.floor(e.latlng.lat);
            const pixel = sectorsCache.getPixel(frame, x, y);
            setSelected({ x, y, pixel });
            getPixelAccount(pixel?.publicId);
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

    useEffect(() => {
        if (selected) {
            const { x, y } = selected;
            const pixel = sectorsCache.getPixel(frame, x, y);
            setSelected({ x, y, pixel });
            if (isStatic) getPixelAccount(pixel?.publicId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frame, isStatic])

    async function getPixelAccount(publicId) {
        if (!publicId) {
            setSelectedAccount(null);
            return
        }
        const [res, err] = await AccountService.getByPublicID(publicId);
        if (err) {
            toast.error(err.messageCode);
            setSelectedAccount(null);
            return
        }
        setSelectedAccount(res.data);
    }

    function handleClose() {
        setSelected(null);
    }

    function toColorName(pixel) {
        if (!pixel) return "";
        const colorName = pixel?.colorName;
        const colorIndex = pixel?.colorIndex;
        if (colorIndex == NULL_COLOR_INDEX) return "";
        return ` - ${t("palette." + colorName)} (${colorIndex})`;
    }

    return (
        <>
            {highlight && <Pixel x={highlight.x} y={highlight.y} c={white} opacity={0.1} b={true} />}
            {selected && <Pixel x={selected.x} y={selected.y} c={white} opacity={0.1} b={true} />}

            {(selected && isStatic) ? (
                <Window close={handleClose} sx={{ minWidth: 400 }}>
                    <Stack spacing={1}>
                        <Typography variant="h6" color="primary" align='start'>
                            Pixel{toColorName(selected?.pixel)}
                        </Typography>
                        <Divider sx={{ width: '100%' }} />
                        <Typography color="text" fontSize={"large"} fontWeight="bold" variant="body1">
                            x: {selected.x}, y: {selected.y}, frame: {frame}
                        </Typography>
                        <PaintedAccount account={selectedAccount} />
                        <PaintButton sx={{ maxWidth: "500px" }} />
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