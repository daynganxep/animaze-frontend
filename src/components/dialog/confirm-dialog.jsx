import { useState, cloneElement } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    useTheme,
    Stack,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const typeColorMap = {
    delete: "error",
    warning: "warning",
    info: "info",
    success: "success",
    default: "primary",
};

export default function ConfirmDialog({
    type = "default",
    title,
    description,
    cancelTitle = "common.cancel",
    confirmTitle = "common.ok",
    action,
    triggerButton,
}) {
    const { t } = useTranslation();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleConfirm = async () => {
        try {
            setLoading(true);
            await action?.();
            handleClose();
        } catch (err) {
            console.error("Action failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {triggerButton &&
                cloneElement(triggerButton, {
                    onClick: handleOpen,
                })}

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                sx={{
                    "& .MuiPaper-root": {
                        bgcolor: theme.palette.background.paper,
                        borderRadius: theme.shape.borderRadius,
                    },
                }}
            >
                <DialogTitle sx={{ color: theme.palette.text.primary, mb: 2 }}>
                    {t(title)}
                </DialogTitle>

                {description &&
                    <DialogContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            overflow: "visible",
                        }}
                    >
                        <Stack spacing={2}>
                            <Typography color="text.secondary">
                                {t(description)}
                            </Typography>
                        </Stack>
                    </DialogContent>
                }

                <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
                    <Button
                        onClick={handleClose}
                        variant="text"
                        color="inherit"
                        size="large"
                        disabled={loading}
                    >
                        {t(cancelTitle)}
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        variant="contained"
                        color={typeColorMap[type] || "primary"}
                        size="large"
                        disabled={loading}
                    >
                        {t(confirmTitle)}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
