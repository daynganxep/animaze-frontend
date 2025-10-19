import env from "@/configs/env.config"

const getApiUrl = (path) => {
    return `${env.api_url}${path}`;
};

export { getApiUrl };
