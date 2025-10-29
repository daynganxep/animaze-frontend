import FormDialog from '@/components/dialog/form-dialog';
import {
    TextField,
    Stack,
    IconButton,
} from '@mui/material';
import { Plane } from 'lucide-react';
import { useMap } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import useDialog from '@/hooks/use-dialog';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { coordsSchema } from '@/validations/coords-chema';
import { useEffect, useRef } from 'react';
import L from "leaflet";
import { MAX_ZOOM, MIN_ZOOM } from '@/configs/const.config';
import { WORLD_DIMENSION } from '@/configs/env.config';

export default function Navigator() {
    const map = useMap();
    const { t } = useTranslation();
    const dialog = useDialog();


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
            map.setView([y, x], z);
        },
    });

    return (
        <FormDialog
            submitButtonText="Move"
            cancelButtonText="Cancel"
            form={form}
            mutation={mutation}
            dialog={dialog}
            triggerButton={
                <IconButton ref={moveRef} size='large' color="primary" onClick={dialog.open}>
                    <Plane />
                </IconButton>
            }
        >
            <Stack direction={"row"} spacing={2}>
                <TextField
                    fullWidth
                    label={t("Zoom")}
                    name="z"
                    error={!!errors.z}
                    helperText={errors?.z?.message}
                    required
                    type="number"
                    slotProps={{
                        htmlInput: {
                            type: "number",
                            step: 0.25,
                            min: MIN_ZOOM,
                            max: MAX_ZOOM,
                            placeholder: `(${MIN_ZOOM} - ${MAX_ZOOM})`,
                        },
                    }}
                    {...register("z")}
                />
                <TextField
                    fullWidth
                    label={t("Pixel X")}
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
                    label={t("Pixel Y")}
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
        </ FormDialog >
    );
}
