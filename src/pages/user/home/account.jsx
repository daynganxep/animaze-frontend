import GeneralDialog from '@/components/dialog/general-dialog';
import { Avatar, Box, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import GoogleLoginOauth2 from '@/components/ui/google-login-oauth2';
import { useSelector } from 'react-redux';
import logo_text_animaze from "@/assets/images/logo-text-animaze.svg"
import { useEffect, useRef, useState } from 'react';
import L from "leaflet";
import { useDispatch } from 'react-redux';
import { uiActions } from '@/redux/slices/ui.slice';
import Tippy from '@tippyjs/react/headless';
import Window from '@/components/ui/window';
import useTippy from '@/hooks/use-tippy';
import { authActions } from '@/redux/slices/auth.slice';
import { Copy, LogIn, LogOut } from 'lucide-react';


export default function Account() {
    const { logged, account } = useSelector(s => s.auth);
    const { signInDialog } = useSelector(s => s.ui);
    const dispatch = useDispatch();

    const tippy = useTippy();

    const dialog = {
        opening: signInDialog,
        open: () => dispatch(uiActions.setStates({ field: "signInDialog", value: true })),
        close: () => dispatch(uiActions.setStates({ field: "signInDialog", value: false })),
    }

    const avatarRef = useRef(null);
    const loginRef = useRef(null);

    useEffect(() => {
        if (avatarRef.current) L.DomEvent.disableClickPropagation(avatarRef.current);
        if (loginRef.current) L.DomEvent.disableClickPropagation(loginRef.current);
    }, []);

    function handleLogout() {
        dispatch(authActions.setStates({ field: "tokens", reset: true }))
    }

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (account?.publicId) {
            navigator.clipboard.writeText(account.publicId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };


    if (logged) {
        return <Tippy
            onClickOutside={tippy.close}
            interactive={true}
            visible={tippy.opening}
            placement='left-start'
            render={(attrs) => (
                <Window {...attrs} close={tippy.close}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={1}>
                        <Avatar
                            src={account?.avatar}
                            srcSet={account?.avatar}
                            variant="circular"
                            sx={{
                                width: 80,
                                height: 80,
                                cursor: "pointer",
                                transition: "0.3s",
                                "&:hover": { boxShadow: 3 },
                            }}
                        />
                        <Stack spacing={0.5} alignItems="start" sx={{ pr: 4, minWidth: 220 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                noWrap
                                sx={{
                                    maxWidth: 200,
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {account?.name}
                            </Typography>


                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="subtitle1" color="text.secondary" noWrap>
                                    ID: {account?.publicId}
                                </Typography>

                                <Tooltip title={copied ? "Copied!" : "Copy ID"}>
                                    <Copy onClick={handleCopy} fontSize="small" />
                                </Tooltip>
                            </Stack>

                            <Typography variant="subtitle1" color="text.secondary">
                                Provider: {account?.provider}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Button
                        onClick={handleLogout}
                        size="medium"
                        sx={{ width: "100%", borderRadius: 10 }}
                        endIcon={<LogOut></LogOut>}>
                        Log out
                    </Button>
                </Window>
            )}>
            <Avatar
                onClick={tippy.open}
                ref={avatarRef}
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
            />
        </Tippy>
    }

    return (
        <GeneralDialog
            dialog={dialog}
            triggerButton={
                <IconButton
                    ref={loginRef}
                    size="large"
                    onClick={dialog.open}
                >
                    <LogIn />
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
