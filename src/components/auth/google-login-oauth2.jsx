import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import AuthService from '@/services/auth.service';
import { authActions } from '@/redux/slices/auth.slice';
import { useDispatch } from 'react-redux';
import toast from '@/hooks/toast';
import { GOOGLE_CLIENT_ID } from '@/configs/env.config';

export default function GoogleLoginOauth2({ closeDialog }) {
    const dispatch = useDispatch();

    async function handleSuccess(credentialResponse) {
        const [res, err] = await AuthService.oauth2Google(credentialResponse);
        if (err) {
            toast.error(err.messageCode);
            return;
        }
        toast.success(res.messageCode);
        dispatch(authActions.setStates({ field: 'tokens', value: res.data }));
        closeDialog();
    }

    function handleError() {
        toast.error('Login Failed');
        closeDialog();
    }

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="filled_black"
                size="large"
                shape="pill"
                text="continue_with"
                logo_alignment="left"
                ux_mode="popup"
                width="100%"
            />
        </GoogleOAuthProvider>
    );
}
