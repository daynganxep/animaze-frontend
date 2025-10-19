import axios, { service } from "@/tools/axios.tool";
import store from "@/redux/store.redux";

const AuthService = {
    oauth2Google(credentialResponse) {
        return service(axios.post("/auth/oauth2/google", credentialResponse));
    },
    refreshToken() {
        const { refreshToken } = store.getState().auth.tokens;
        return service(
            axios.post("/auth/refresh-token", { refreshToken }),
        );
    },
};

export default AuthService;
