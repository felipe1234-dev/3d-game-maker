import { getEnv } from "@local/functions";

const config = {
    apiKey: getEnv("api key"),
    authDomain: getEnv("auth domain"),
    projectId: getEnv("project id"),
    storageBucket: getEnv("storage bucket"),
    messagingSenderId: getEnv("messaging sender id"),
    appId: getEnv("app id")
};

export default config;