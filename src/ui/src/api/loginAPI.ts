import {instance} from './rootAPI';
import {message} from 'antd';


export const LoginAPI = {
    signout: () => {
        return instance.post('signout')
    },

    login: (data: FormData) => {
        return instance.post('login', data)
    },

    singUp: (data: FormData) => {
        return instance.post('signup', data)
    },
    
    userInfo: () => {
        return instance.get('dashboard')
    }
}