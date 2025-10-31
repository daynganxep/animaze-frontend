import L from "leaflet";
import { Stack, IconButton, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ANIMATION_MODE } from '@/configs/const.config';
import { animationActions } from '@/redux/slices/animation.slice';
import { FRAMES_COUNT } from '@/configs/env.config';
import { uiActions } from '@/redux/slices/ui.slice';
import { useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ViewControl() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { mode, frame } = useSelector(state => state.animation);
    const isStatic = mode === ANIMATION_MODE.STATIC;

    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) L.DomEvent.disableClickPropagation(ref.current);
    }, []);


    const toggleMode = () => {
        const newMode = isStatic ? ANIMATION_MODE.DYNAMIC : ANIMATION_MODE.STATIC;
        dispatch(animationActions.setStates({ field: 'mode', value: newMode }));
        dispatch(uiActions.setStates({ field: 'paintMode', value: false }));
    };

    const handleFrameChange = (e, newFrame) => {
        if (newFrame !== null) {
            dispatch(animationActions.setStates({ field: 'frame', value: newFrame }));
        }
    };

    return (
        <Stack
            direction="column"
            spacing={2}
            ref={ref}
        >
            <Tooltip arrow placement="left" title={t(isStatic ? "ui.static" : "ui.dynamic")}>
                <IconButton size='large' onClick={toggleMode}>
                    {isStatic ? <Play /> : <Pause />}
                </IconButton>
            </Tooltip>

            <ToggleButtonGroup
                value={frame}
                exclusive
                onChange={handleFrameChange}
                size="small"
                orientation="vertical"
                disabled={!isStatic}
            >
                {Array.from({ length: FRAMES_COUNT }, (_, i) => i).map(f => (
                    <ToggleButton key={f} value={f}>
                        {f}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
}
