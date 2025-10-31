import FormDialog from '@/components/dialog/form-dialog';
import {
    TextField,
    Stack,
    IconButton,
    Tooltip,
    Slider,
    Typography,
} from '@mui/material';
import { Plane } from 'lucide-react';
import { useMap } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import useDialog from '@/hooks/use-dialog';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { coordsSchema } from '@/validations/coords-chema';
import { useEffect, useRef } from 'react';
import L from "leaflet";
import { flyOptions, MAX_ZOOM, MIN_ZOOM } from '@/configs/const.config';
import { WORLD_DIMENSION } from '@/configs/env.config';
import useInitNavigate from '@/hooks/use-init-navigate';

export default function Navigator() {
    const map = useMap();
    const { t } = useTranslation();
    const dialog = useDialog();
    useInitNavigate();

    const moveRef = useRef(null);

    useEffect(() => {
        if (moveRef.current) L.DomEvent.disableClickPropagation(moveRef.current);
    }, []);

    const form = useForm({
        resolver: joiResolver(coordsSchema),
        defaultValues: { z: 0, x: 0, y: 0 }
    });

    const {
        register,
        formState: { errors },
    } = form;

    const mutation = useMutation({
        mutationFn: (data) => {
            dialog.close();
            const { z, x, y } = data;
            map.flyTo([y, x], z, flyOptions);
            map.fire('click', { latlng: L.latLng(y, x) });
        },
    });

    return (
        <FormDialog
            submitButtonText="ui.fly"
            cancelButtonText="common.close"
            form={form}
            mutation={mutation}
            dialog={dialog}
            triggerButton={
                <Tooltip arrow placement="left" title={t("ui.fly")}>
                    <IconButton ref={moveRef} size='large' color="primary" onClick={dialog.open}>
                        <Plane />
                    </IconButton>
                </Tooltip>
            }
        >
            <Stack direction={"column"} spacing={2}>
                <Stack direction={"row"} spacing={2}>
                    <TextField
                        fullWidth
                        label={t("ui.pixel-x")}
                        name="x"
                        error={!!errors.x}
                        helperText={errors?.x?.message}
                        required
                        type="number"
                        slotProps={{
                            htmlInput: {
                                min: 0,
                                max: WORLD_DIMENSION - 1,
                                placeholder: `(${0} - ${WORLD_DIMENSION - 1})`,

                            },
                        }}
                        {...register("x")}
                    />
                    <TextField
                        fullWidth
                        label={t("ui.pixel-y")}
                        name="y"
                        error={!!errors.y}
                        helperText={errors?.y?.message}
                        required
                        type="number"
                        slotProps={{
                            htmlInput: {
                                min: 0,
                                max: WORLD_DIMENSION - 1,
                                placeholder: `(${0} - ${WORLD_DIMENSION - 1})`,
                            },
                        }}
                        {...register("y")}
                    />
                </Stack>
                <Stack >
                    <Typography variant="body2">{t('ui.zoom')}</Typography>
                    <Controller
                        name="z"
                        control={form.control}
                        render={({ field }) => (
                            <Slider
                                {...field}
                                value={typeof field.value === 'number' ? field.value : 0}
                                onChange={(_, value) => field.onChange(value)}
                                min={MIN_ZOOM}
                                max={MAX_ZOOM}
                                step={0.25}
                                valueLabelDisplay="auto"
                                marks={[{ value: MIN_ZOOM, label: String(MIN_ZOOM) }, { value: MAX_ZOOM, label: String(MAX_ZOOM) }]}
                            />
                        )}
                    />
                    {errors.z && (
                        <Typography variant="caption" color="error">{errors.z.message}</Typography>
                    )}
                </Stack>
            </Stack>
        </ FormDialog >
    );
}
