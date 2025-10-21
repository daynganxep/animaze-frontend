import _ from "lodash";

function getEnvValue(name, defaultValue = "") {
    const env = import.meta.env;
    return _.get(env, name, defaultValue);
}

const env = {
    api_url: getEnvValue("VITE_API_URL", "http://localhost:8000/api/v1"),
    interval_refresh_token:
        _.toNumber(getEnvValue("VITE_INTERVAL_REFRESHTOKEN", "3600")) *
        1000 *
        0.9,
    google_client_id: getEnvValue("VITE_GOOGLE_CLIENT_ID", ""),
    canvas_size: _.toNumber(getEnvValue("VITE_CANVAS_SIZE", "2560000")),
    sector_size: _.toNumber(getEnvValue("VITE_SECTOR_SIZE", "256")),
    frames_count: _.toNumber(getEnvValue("VITE_FRAMES_COUNT", "4")),
    canvas_url: getEnvValue("VITE_CANVAS_URL", 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    canvas_attribution: getEnvValue("VITE_CANVAS_ATTRIBUTION", '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'),
};

export default env;