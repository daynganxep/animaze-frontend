import { Stack, IconButton, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
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
        console.log(newFrame)
        if (newFrame !== null) {
            dispatch(animationActions.setStates({ field: 'frame', value: newFrame }));
        }
    };

    return (
        <Stack
            direction="column"
            spacing={2}
        >
            <IconButton
                color={mode === ANIMATION_MODE.STATIC ? 'secondary' : 'primary'}
                onClick={toggleMode}
                sx={{
                    border: '1px solid',
                    borderColor: mode === ANIMATION_MODE.STATIC ? 'secondary.main' : 'primary.main',
                    width: 48,
                    height: 48,
                }}
            >
                {mode === ANIMATION_MODE.STATIC ? (
                    <PlayArrow />
                ) : (
                    <Pause />
                )}
            </IconButton>
            {/* </Tooltip> */}

            {/* 🎞 Frame buttons */}
            <ToggleButtonGroup
                value={frame}
                exclusive
                onChange={handleFrameChange}
                size="medium"
                color="secondary"
                orientation="vertical"
                disabled={mode !== ANIMATION_MODE.STATIC}
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
