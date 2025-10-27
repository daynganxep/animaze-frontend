import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import AuthService from '@/services/auth.service';
import { authActions } from '@/redux/slices/auth.slice';
import { useDispatch } from 'react-redux';
import toast from '@/hooks/toast';
import env from "@/configs/env.config"

export default function GoogleLoginOauth2() {
    const dispatch = useDispatch();

    async function handleSuccess(credentialResponse) {
        const [res, err] = await AuthService.oauth2Google(credentialResponse);
        if (err) {
            toast.error(err.messageCode);
            return;
        }
        console.log({ res })
        toast.success(res.messageCode);
        dispatch(
            authActions.setStates({ field: 'tokens', value: res.data })
        )
    }


    return (
        <GoogleOAuthProvider clientId={env.google_client_id}>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => toast.error('Login Failed')}
                useOneTap
                theme="outline"
                size="large"
                shape="pill"
                text="signin_with"
                logo_alignment="left"
                width="100%"
                cancel_on_tap_outside
                ux_mode='popup'
            />
        </GoogleOAuthProvider>
    );
}
