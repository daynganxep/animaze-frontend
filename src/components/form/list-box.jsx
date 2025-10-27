import {
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel,
    useTheme,
} from '@mui/material';
import { MODULE_OPTIONS } from '@configs/const.config';

function ListBox() {
    const theme = useTheme();

    return (<Box
        sx={{
            bgcolor: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            p: 3,
        }}
    >
        <FormLabel
            component="legend"
            sx={{ color: theme.palette.text.primary, mb: 2, fontWeight: 600, fontSize: 18 }}
        >
            Các module
        </FormLabel>
        <FormGroup
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                mb: 1,
            }}
        >
            {MODULE_OPTIONS.map((module) => (
                <FormControlLabel
                    key={module.code}
                    control={
                        <Checkbox
                            // checked={data.moduleCodes?.includes(module.code)}
                            onChange={() => handleModuleChange(module.code)}
                            disabled={[MODULE_OPTIONS[0].code, MODULE_OPTIONS[1].code].includes(module.code)}
                            sx={{
                                color: theme.palette.primary.main,
                                bgcolor: theme.palette.background.paper,
                                borderRadius: 2,
                                p: 0.5,
                                mx: 1,
                                '&:hover': {
                                    bgcolor: theme.palette.action.hover,
                                },
                                '&.Mui-checked': {
                                    color: theme.palette.primary.main,
                                    bgcolor: theme.palette.action.selected,
                                },
                            }}
                        />
                    }
                    label={
                        <Typography sx={{ color: theme.palette.text.primary, fontWeight: 500, fontSize: 16 }}>
                            {module.label}
                        </Typography>
                    }
                    sx={{
                        alignItems: 'center',
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        bgcolor: theme.palette.background.paper,
                        boxShadow: 1,
                        transition: 'box-shadow 0.2s',
                        '&:hover': {
                            boxShadow: 3,
                        },
                    }}
                />
            ))}
        </FormGroup>
    </Box>);
}

export default ListBox;