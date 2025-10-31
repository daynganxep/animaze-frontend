import GeneralDialog from '@/components/dialog/general-dialog';
import { Box, IconButton, Tooltip } from '@mui/material';
import GoogleLoginOauth2 from '@/components/ui/google-login-oauth2';
import { useSelector } from 'react-redux';
import { useEffect, useRef, } from 'react';
import L from "leaflet";
import { useDispatch } from 'react-redux';
import { LogIn } from 'lucide-react';
import { uiActions } from '@/redux/slices/ui.slice';
import logo_text_animaze from "@/assets/images/logo-text-animaze.svg"
import { useTranslation } from 'react-i18next';


export default function LoginButton() {
    const { t } = useTranslation();
    const { signInDialog } = useSelector(s => s.ui);
    const dispatch = useDispatch();

    const dialog = {
        opening: signInDialog,
        open: () => dispatch(uiActions.setStates({ field: "signInDialog", value: true })),
        close: () => dispatch(uiActions.setStates({ field: "signInDialog", value: false })),
    }

    const loginRef = useRef(null);

    useEffect(() => {
        if (loginRef.current) L.DomEvent.disableClickPropagation(loginRef.current);
    }, []);


    return (
        <GeneralDialog
            dialog={dialog}
            triggerButton={
                <Tooltip arrow placement="left" title={t("ui.log-in")}>
                    <IconButton
                        ref={loginRef}
                        size="large"
                        onClick={dialog.open}
                    >
                        <LogIn />
                    </IconButton>
                </Tooltip>
            }>
            <Box src={logo_text_animaze} component="img" borderRadius={20} paddingX={4} paddingY={1} bgcolor={(t) => t.palette.background.black}>
            </Box>
            <Box sx={{ textAlign: 'center', my: 2, color: 'text.secondary' }}>
                {t("ui.welcome")}
            </Box>
            <GoogleLoginOauth2 closeDialog={dialog.close} />
            <Box sx={{
                fontSize: '0.75rem',
                textAlign: 'center',
                mt: 2,
                color: 'text.secondary',
                px: 2
            }}>
                {t("ui.policy")}
            </Box>
        </GeneralDialog>
    );
}
