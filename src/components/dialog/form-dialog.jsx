import { useTranslation } from "react-i18next";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    useTheme,
    Stack,
} from "@mui/material";
import ErrorMessage from "@/components/form/error-message";

function FormDialog({
    title,
    children,
    triggerButton,
    dialog,
    submitButtonText = "common.ok",
    cancelButtonText = "common.cancel",
    mutation,
    form
}) {
    const { t } = useTranslation();
    const theme = useTheme();
    const {
        handleSubmit,
        formState: { isValid },
    } = form;

    return (
        <>
            {triggerButton}
            <Dialog
                open={dialog.opening}
                onClose={dialog.close}
                maxWidth="sm"
                fullWidth
                sx={{
                    "& .MuiPaper-root": {
                        bgcolor: theme.palette.background.paper,
                        borderRadius: theme.shape.borderRadius,
                    },
                }}
            >
                <form onSubmit={handleSubmit(mutation.mutate)}>
                    {title &&
                        <DialogTitle sx={{ color: theme.palette.text.primary, mb: 3 }}>
                            {t(title)}
                        </DialogTitle>
                    }

                    <DialogContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            overflow: "visible",
                        }}
                    >
                        <ErrorMessage mutation={mutation} />
                        <Stack spacing={3}>
                            {children}
                        </Stack>
                    </DialogContent>

                    <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
                        <Button onClick={dialog.close} variant="text" color="inherit" size="large">
                            {t(cancelButtonText)}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!isValid}
                            loading={mutation.isPending}
                            size="large"
                        >
                            {t(submitButtonText)}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog >
        </>
    );
}

export default FormDialog;
