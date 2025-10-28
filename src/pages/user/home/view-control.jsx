import { Stack, IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ANIMATION_MODE } from '@/configs/const.config';
import { animationActions } from '@/redux/slices/animation.slice';
import { PlayArrow, Pause } from '@mui/icons-material';

export default function ViewControl() {
    const dispatch = useDispatch();
    const { mode, frame } = useSelector(state => state.animation);

    const toggleMode = () => {
        const newMode =
            mode === ANIMATION_MODE.STATIC ? ANIMATION_MODE.DYNAMIC : ANIMATION_MODE.STATIC;
        dispatch(animationActions.setStates({ field: 'mode', value: newMode }));
    };

    const handleFrameChange = (_, newFrame) => {
        if (newFrame !== null) {
            dispatch(animationActions.setStates({ field: 'frame', value: newFrame }));
        }
    };

    return (
        <Stack
            direction="column"
            spacing={2}
        >
            <IconButton size='large' onClick={toggleMode}>
                {mode === ANIMATION_MODE.STATIC ? (
                    <PlayArrow />
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
                {[0, 1, 2, 3].map(f => (
                    <ToggleButton key={f} value={f}>
                        {f}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
}
