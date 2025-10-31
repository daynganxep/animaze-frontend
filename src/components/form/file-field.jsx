import { Controller } from 'react-hook-form';
import { Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Upload } from 'lucide-react';

function FileField({ control, name, rules, label }) {
    const { t } = useTranslation();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Stack spacing={1}>
                    <Button
                        variant={value ? "outlined" : "contained"}
                        component="label"
                        size="large"
                        startIcon={<Upload />}
                    >
                        {value ? value.name : (label || t('ui.upload-file'))}
                        <input
                            type="file"
                            hidden
                            accept=".json"
                            onChange={(e) => onChange(e.target.files[0])}
                        />
                    </Button>
                    {error && <Typography color="error" variant="caption">{error.message}</Typography>}
                </Stack>
            )}
        />
    );
}

export default FileField;