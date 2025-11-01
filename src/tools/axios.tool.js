import axios from "axios";
import store from "@/redux/store.redux";

import { API_KEY, API_URL } from "@/configs/env.config";
import _ from "lodash";

const axiosInstance = axios.create({ baseURL: API_URL });
axiosInstance.interceptors.request.use(
    (config) => {
        const { accessToken } = store.getState().auth.tokens;
        const logged = store.getState().auth.logged || false;
        if (logged && accessToken) {
            config.headers.set("Authorization", `Bearer ${accessToken}`);
        }
        config.headers.set('X-API-Key', API_KEY);
        return config;
    },

    (error) => {
        return Promise.reject(error);
    },
);

export async function service(axiosPromise, getData = false, raw = false) {
    try {
        const response = await axiosPromise;
        if (raw) return [response, null];
        const result = getData
            ? _.get(response, "data.data")
            : { ...response.data, status: response.status };
        return [result, null];
    } catch (error) {
        const errorResponse = error.response
            ? { ...error.response.data, status: error.response.status }
            : { message: error.message, status: error.code || 500 };
        return [null, errorResponse];
    }
}

export default axiosInstance;
