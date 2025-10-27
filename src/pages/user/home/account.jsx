import useDialog from '@/hooks/use-dialog';
import GeneralDialog from '@/components/dialog/general-dialog';
import { Avatar, IconButton } from '@mui/material';
import { Login } from '@mui/icons-material';
import GoogleLoginOauth2 from '@/components/ui/google-login-oauth2';
import { useSelector } from 'react-redux';


export default function Account() {
    const { isLoging, account } = useSelector(s => s.auth);
    const dialog = useDialog();

    return (
        <GeneralDialog
            dialog={dialog}
            triggerButton={
                isLoging ?
                    <Avatar
                        src={account.avatar}
                        srcSet={account.avatar}
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
                        color="secondary"
                        size="large"
                        onClick={dialog.open}
                        sx={{
                            border: '1px solid',
                            borderColor: 'secondary.main',
                            backgroundColor: "white"
                        }}
                    >
                        <Login />
                    </IconButton>
            }>
            <GoogleLoginOauth2 />
        </GeneralDialog>
    );
}
