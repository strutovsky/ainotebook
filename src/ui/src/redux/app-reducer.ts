import { LoginAPI } from '../api/loginAPI';
import {IReducer} from '../interfaces/basic';
import {INotices} from '../interfaces/notices';
import {BaseThunkType, InferActionsTypes} from './state';
import {message} from 'antd';

type Ilang = "eng" | "ukr"

type IApp = {
    lang: Ilang,
    isLogined: boolean,
}

let initState: IReducer<IApp> = {
    pending: false,
    error: "",
    data: {
        lang: 'eng',
        isLogined: false
    }
}

const appReducer = (state = initState, action: ActionsType): IReducer<IApp>  => {
    switch(action.type){
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            }

        case 'SET_LANG': {
            localStorage.setItem('lang', action.payload)
            return {
                ...state,
                data: {...state.data, lang: action.payload}
            }
        }

        case 'SET_PENDING':
            return {
                ...state,
                pending: action.payload
            }

        case 'SET_IS_LOGINED':
            return {
                ...state,
                data: {...state.data, isLogined: action.payload}
            }

        default: return state
    }
}

export const actions = {
    setPending: (payload: boolean) => ({type: 'SET_PENDING', payload} as const),
    setErrorApp: (payload: string) => ({type: 'SET_ERROR', payload} as const),
    setLang: (payload: Ilang) => ({type: 'SET_LANG', payload} as const),
    setIsLogined: (payload: boolean) => ({type: 'SET_IS_LOGINED', payload} as const)
}

export const checkLangThunk = () => {
    return (dispatch: any) => {
        let temp = localStorage.getItem('lang')
        if(temp){
            dispatch(setLang(temp as Ilang))
        }
    }
}

export const checkLoginThunk = () => {
    return (dispatch: any) => {
        const temp = document.cookie

        if(temp.match(/session=.+/)){
            dispatch(actions.setIsLogined(true))
        }else {
            dispatch(actions.setIsLogined(false))
        }
    }
}

export const loginThunk = (data: FormData) => {
    return (dispatch: any) => {
        dispatch(actions.setPending(true))
        LoginAPI.login(data).then(res => {
            window.location.reload()
        }).catch(err => {
            const errorCode = JSON.stringify(err).match(/code\s\d+/)?.[0]

            if(errorCode === 'code 409') {
                message.error('User not found')
            }

            else if (errorCode === 'code 401') {
                message.error('Wrong password')
            } else {
                message.error('Some error occurred')
            }

        }).finally(() => {
            dispatch(actions.setPending(false))
        })
    }
}

export const singUpThunk = (data: FormData) => {
    return (dispatch: any) => {
        dispatch(actions.setPending(true))
        LoginAPI.singUp(data).then(() => {
            message.success('User has been created')
            window.location.reload()
        }).catch(err => {
            const errorCode = JSON.stringify(err).match(/code\s\d+/)?.[0]

            if(errorCode === 'code 409') {
                message.error('User is already registered')
            } else {
                message.error('Some error occurred')
            }

        }).finally(() => {
            dispatch(actions.setPending(false))
        })
    }
}



export const singOutThunk = () => {
    return () => {
        actions.setPending(true)
        LoginAPI.signout().then(() => {
            actions.setIsLogined(false)
            localStorage.removeItem('lang')
            window.history.pushState({}, 'Login', '/')
            window.location.reload()
        }).catch(() => {
            message.error('Something wrong try again!')
        }).finally(() => {
            actions.setPending(false)
        })
    }
}

type ActionsType = InferActionsTypes<typeof actions>
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export const {setLang} = actions


export default appReducer;