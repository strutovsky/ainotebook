import axios from "axios";
import {message} from 'antd';

const DEBUG = process.env.NODE_ENV === "development";


export const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost/api",
    headers: {
            'Content-Type': 'application/json',
    },
})

// instance.interceptors.request.use(config => {
//     // // if(!document.cookie.match(/session=.+/) && config.url !== 'login' && config.url !== 'signup'){
//     // //     window.location.reload()
//     // // }
//     //
//     // return config
// }, error => {
//     message.error('Network error')
// })


instance.interceptors.response.use(res => res, (error) => {
    const code = JSON.stringify(error).match(/code\s\d+/)?.[0]
    throw error
})

