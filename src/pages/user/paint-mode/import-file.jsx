import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import SectorService from '@/services/sector.service';
import {
    TextField,
    Tooltip,
    IconButton,
    Stack,
    Typography,
    Box,
    Button,
} from '@mui/material';
import FormDialog from '@/components/dialog/form-dialog';
import { importPixelsSchema } from '@/validations/import-pixels-schema';
import useDialog from '@/hooks/use-dialog';
import { Import } from 'lucide-react';
import { FRAMES_COUNT, WORLD_DIMENSION } from '@/configs/env.config';
import SelectField from '@/components/form/select-field';
import FileField from '@/components/form/file-field';
import { memo, useEffect, useState } from 'react';
import { processBlueprint } from '@/tools/map-file';
import toast from '@/hooks/toast';

function ImportPixels() {
    const { t } = useTranslation();
    const dialog = useDialog();

    const form = useForm({
        resolver: joiResolver(importPixelsSchema),
        defaultValues: { x: 0, y: 0, f: 0, file: null }
    });

    const [pixels, setPixels] = useState([]);

    const {
        register,
        control,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = form;

    const mutation = useMutation({
        mutationFn: async ({ x, y, f }) => {
            const pixelsPatchs = processBlueprint({ x, y, f, pixels });
            const chunkSize = 1000;
            const chunks = [];
            for (let i = 0; i < pixelsPatchs.length; i += chunkSize) {
                chunks.push(pixelsPatchs.slice(i, i + chunkSize));
            }
            const results = await Promise.all(chunks.map(chunk => SectorService.paint({ pixels: chunk })));
            console.log({ results });
            reset();
            return "sector-s-1";
        },
        onSuccess: (res) => {
            dialog.close();
            toast.success(res.code);
        },
    });

    const file = watch("file");

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                let pixels = [];

                if (file.name.endsWith('.json')) {
                    const data = JSON.parse(content);
                    pixels = data.pixels.map(p => ({ x: p.x, y: p.y, c: p.colorName }));
                } else if (file.name.endsWith('.csv')) {
                    const lines = content.split('\n').slice(1);
                    pixels = lines.filter(line => line.trim()).map(line => {
                        const [x, y, , colorName] = line.split(',');
                        return { x: parseInt(x, 10), y: parseInt(y, 10), c: colorName.trim() };
                    });
                }
                setPixels(pixels);
            };
            reader.readAsText(file);
        }
    }, [file, setValue]);

    return (
        <FormDialog
            title="ui.import-pixels-title"
            submitButtonText="ui.paint"
            form={form}
            mutation={mutation}
            dialog={dialog}
            triggerButton={
                <Tooltip arrow placement="top" title={t("ui.import")}>
                    <IconButton
                        onClick={dialog.open}
                    >
                        <Import />
                    </IconButton>
                </Tooltip>
            }
        >
            <Stack direction={"row"} spacing={2}>
                <TextField
                    fullWidth
                    name="x"
                    label={t("ui.start-x")}
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
                    {...register("x", { setValueAs: v => v ? Number(v) : undefined })}
                />
                <TextField
                    fullWidth
                    label={t("ui.start-y")}
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
                    {...register("y", { setValueAs: v => v ? Number(v) : undefined })}
                />
                <SelectField
                    name="f"
                    control={control}
                    label={t("ui.frame")}
                    options={Array.from({ length: FRAMES_COUNT }, (_, i) => i).map((v) => {
                        return {
                            value: v,
                            label: `${t("ui.frame")} ${v}`,
                        }
                    })}
                />
            </Stack>
            <FileField
                name="file"
                control={control}
                label={t("ui.upload-file") + " *.json"}
            />

            <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{t('ui.import-help-title') || 'Convert your artwork to Animaze JSON'}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {t('ui.import-help') || 'Use the converter to produce a JSON blueprint compatible with the uploader. The converter can export pixel positions and color names.'}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    href="https://wplacepaint.com/converter/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ whiteSpace: 'nowrap' }}
                >
                    {t('ui.open-converter') || 'Open Converter'}
                </Button>
            </Box>
        </ FormDialog>
    );
}

export default memo(ImportPixels);