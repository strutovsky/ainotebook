import {IReducer} from '../interfaces/basic';
import {INotices} from '../interfaces/notices';
import {BaseThunkType, InferActionsTypes} from './state';


let initState: IReducer<null> = {
    pending: false,
    error: "",
    data: null
}

const appReducer = (state = initState, action: ActionsType): IReducer<null>  => {
    switch(action.type){
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            }

        default: return state
    }
}

export const actions = {
    // setNoticePending: (payload: boolean) => ({type: "SET_NOTICE_PENDING", payload} as const),
    setErrorApp: (payload: string) => ({type: "SET_ERROR", payload} as const)
}

type ActionsType = InferActionsTypes<typeof actions>
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>


export default appReducer;