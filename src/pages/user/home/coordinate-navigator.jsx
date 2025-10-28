import FormDialog from '@/components/dialog/form-dialog';
import {
    TextField,
    Stack,
    IconButton,
} from '@mui/material';
import { LocalAirport } from '@mui/icons-material';
import { useMap } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import useDialog from '@/hooks/use-dialog';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { coordsSchema } from '@/validations/coords-chema';

export default function CoordinateNavigator() {
    const map = useMap();
    const { t } = useTranslation();
    const dialog = useDialog();

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
                <IconButton size='large' color="primary" onClick={dialog.open}>
                    <LocalAirport />
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
                    type='number'
                    {...register("z")}
                />
                <TextField
                    fullWidth
                    label={t("Pixel X")}
                    name="x"
                    error={!!errors.x}
                    helperText={errors?.x?.message}
                    required
                    type='number'
                    {...register("x")}
                />
                <TextField
                    fullWidth
                    label={t("Pixel Y")}
                    name="y"
                    error={!!errors.y}
                    helperText={errors?.y?.message}
                    required
                    type='number'
                    {...register("y")}
                />
            </Stack>
        </ FormDialog >
    );
}
