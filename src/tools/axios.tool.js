import axios from "axios";
import store from "@/redux/store.redux";
import env from "@/configs/env.config";

import _ from "lodash";

const axiosInstance = axios.create({ baseURL: env.api_url });
axiosInstance.interceptors.request.use(
    (config) => {
        const { accessToken } = store.getState().auth.tokens;
        const isLoging = store.getState().auth.isLoging || false;
        if (isLoging && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export async function service(axiosPromise, getData = false) {
    try {
        const response = await axiosPromise;
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
