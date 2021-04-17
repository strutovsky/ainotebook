import {IReducer} from '../interfaces/basic';
import {INotices} from '../interfaces/notices';
import {BaseThunkType, InferActionsTypes} from './state';

type Ilang = "eng" | "ukr"

type IApp = {
    lang: Ilang
}

let initState: IReducer<IApp> = {
    pending: false,
    error: "",
    data: {
        lang: 'eng'
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

        default: return state
    }
}

export const actions = {
    // setNoticePending: (payload: boolean) => ({type: "SET_NOTICE_PENDING", payload} as const),
    setErrorApp: (payload: string) => ({type: "SET_ERROR", payload} as const),
    setLang: (payload: Ilang) => ({type: 'SET_LANG', payload} as const)
}

export const checkLangThunk = () => {
    return (dispatch: any) => {
        let temp = localStorage.getItem('lang')
        if(temp){
            dispatch(setLang(temp as Ilang))
        }
    }
}

type ActionsType = InferActionsTypes<typeof actions>
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export const {setLang} = actions


export default appReducer;