import { alpha, useTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";


function ReactHotToaster() {
    const theme = useTheme();

    return (
        <Toaster
            position="bottom-right"
            gutter={8}
            containerStyle={{
                position: 'fixed',
                zIndex: theme.zIndex.snackbar,
            }}
            toastOptions={{
                duration: 3000,
                style: {
                    background: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    padding: theme.spacing(1.5, 2),
                    fontSize: theme.typography.body2.fontSize,
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing(1),
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                },
                success: {
                    iconTheme: {
                        primary: theme.palette.success.main,
                        secondary: theme.palette.background.paper,
                    },
                },
                error: {
                    iconTheme: {
                        primary: theme.palette.error.main,
                        secondary: theme.palette.background.paper,
                    },
                },
            }}
        />
    );
}

export default ReactHotToaster;