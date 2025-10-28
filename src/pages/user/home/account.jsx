import useDialog from '@/hooks/use-dialog';
import GeneralDialog from '@/components/dialog/general-dialog';
import { Avatar, Box, IconButton } from '@mui/material';
import { Login } from '@mui/icons-material';
import GoogleLoginOauth2 from '@/components/ui/google-login-oauth2';
import { useSelector } from 'react-redux';
import logo_text_animaze from "@/assets/images/logo-text-animaze.svg"


export default function Account() {
    const { logged, account } = useSelector(s => s.auth);
    const dialog = useDialog();

    return (
        <GeneralDialog
            dialog={dialog}
            triggerButton={
                logged ?
                    <Avatar
                        src={account?.avatar}
                        srcSet={account?.avatar}
                        variant="circular"
                        sx={{
                            width: 48,
                            height: 48,
                            cursor: 'pointer',
                            transition: '0.3s',
                            '&:hover': {
                                boxShadow: 3,
                            },
                        }}
                        onClick={dialog.open}
                    />
                    :
                    <IconButton
                        size="large"
                        onClick={dialog.open}
                    >
                        <Login />
                    </IconButton>
            }>
            <Box src={logo_text_animaze} component="img" borderRadius={20} paddingX={4} paddingY={1} bgcolor={(t) => t.palette.background.black}>
            </Box>
            <Box sx={{ textAlign: 'center', my: 2, color: 'text.secondary' }}>
                Welcome to Animaze! Sign in to start creating and sharing your pixel art animations.
            </Box>
            <GoogleLoginOauth2 closeDialog={dialog.close} />
            <Box sx={{
                fontSize: '0.75rem',
                textAlign: 'center',
                mt: 2,
                color: 'text.secondary',
                px: 2
            }}>
                By signing in, you agree to our Terms of Service and Privacy Policy
            </Box>
        </GeneralDialog>
    );
}
