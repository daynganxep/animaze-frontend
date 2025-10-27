import { useTranslation } from "react-i18next";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    useTheme,
} from "@mui/material";

function GeneralDialog({
    title,
    children,
    triggerButton,
    dialog,
}) {
    const { t } = useTranslation();
    const theme = useTheme();

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
                        borderRadius: 10,
                    },
                }}
            >
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
                    {children}
                </DialogContent>
            </Dialog >
        </>
    );
}

export default GeneralDialog;
