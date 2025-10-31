import { useEffect } from 'react';
import AuthService from '@/services/auth.service';
import { useDispatch } from 'react-redux';
import { authActions } from '@/redux/slices/auth.slice';
import toast from '@/hooks/toast';
import { GOOGLE_CLIENT_ID } from '@/configs/env.config';

export default function GoogleOneTapInit() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!window.google?.accounts?.id) return;

        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: async (credentialResponse) => {
                const [res, err] = await AuthService.oauth2Google(credentialResponse);
                if (err) {
                    toast.error(err.messageCode);
                    return;
                }
                toast.success(res.messageCode);
                dispatch(authActions.setStates({ field: 'tokens', value: res.data }));
            },
            auto_select: false,
            cancel_on_tap_outside: true,
            prompt_parent_id: 'one-tap',
        });

        window.google.accounts.id.prompt();

    }, [dispatch]);

    return null;
}
