import _ from "lodash";

function getEnvValue(name, defaultValue = "") {
    const env = import.meta.env;
    return _.get(env, name, defaultValue);
}

export const API_URL = getEnvValue("VITE_API_URL", "http://localhost:8000/api/v1");
export const API_KEY = getEnvValue("VITE_API_KEY", "");
export const CLIENT_URL = getEnvValue("VITE_CLIENT_URL", "http://localhost:3000");
export const INTERVAL_REFRESH_TOKEN =
    _.toNumber(getEnvValue("VITE_INTERVAL_REFRESH_TOKEN", "3600")) *
    1000 *
    0.9;
export const GOOGLE_CLIENT_ID = getEnvValue("VITE_GOOGLE_CLIENT_ID", "");
export const WORLD_DIMENSION = _.toNumber(getEnvValue("VITE_WORLD_DIMENSION", "256000"));
export const SECTOR_SIZE = _.toNumber(getEnvValue("VITE_SECTOR_SIZE", "256"));
export const FRAMES_COUNT = _.toNumber(getEnvValue("VITE_FRAMES_COUNT", "4"));
export const CANVAS_URL = getEnvValue("VITE_CANVAS_URL", 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
export const CANVAS_ATTRIBUTION = getEnvValue("VITE_CANVAS_ATTRIBUTION", '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors');
