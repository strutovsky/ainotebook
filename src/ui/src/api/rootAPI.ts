import axios from "axios";

const DEBUG = process.env.NODE_ENV === "development";


export const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost/api",
    headers: {
            'Content-Type': 'application/json',


    },
})

instance.interceptors.request.use((config) => {
    if (DEBUG) {
        //console.info("✉️ ", config);
    }
    return config;
}, (error) => {
    if (DEBUG) { console.error("✉️ ", error); }
    return Promise.reject(error);
});
