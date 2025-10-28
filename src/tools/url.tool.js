import { API_URL } from "@/configs/env.config";

const getApiUrl = (path) => {
    return `${API_URL}${path}`;
};

export { getApiUrl };
