import { Stack, IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ANIMATION_MODE } from '@/configs/const.config';
import { animationActions } from '@/redux/slices/animation.slice';
import { FRAMES_COUNT } from '@/configs/env.config';
import { uiActions } from '@/redux/slices/ui.slice';
import { useEffect, useRef } from 'react';
import L from "leaflet";
import { Play, Pause } from 'lucide-react';

export default function ViewControl() {
    const dispatch = useDispatch();
    const { mode, frame } = useSelector(state => state.animation);


    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) L.DomEvent.disableClickPropagation(ref.current);
    }, []);


    const toggleMode = () => {
        const newMode =
            mode === ANIMATION_MODE.STATIC ? ANIMATION_MODE.DYNAMIC : ANIMATION_MODE.STATIC;
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
            <IconButton size='large' onClick={toggleMode}>
                {mode === ANIMATION_MODE.STATIC ? (
                    <Play />
                ) : (
                    <Pause />
                )}
            </IconButton>

            <ToggleButtonGroup
                value={frame}
                exclusive
                onChange={handleFrameChange}
                size="small"
                orientation="vertical"
                disabled={mode === ANIMATION_MODE.DYNAMIC}
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
