import {IReducer} from "../interfaces/basic";
import { InferActionsTypes, BaseThunkType } from "./state";
import {Dispatch} from "redux";
import {INotices} from "../interfaces/notices";
import {NoticeAPI} from "../api/noticeAPI";


let initState: IReducer<INotices> = {
    pending: false,
    error: false,
    data: []
}

const noticeReducer = (state = initState, action: ActionsType): IReducer<INotices>  => {
    switch(action.type){
        case "SET_NOTICE_PENDING":
            return {
                ...state,
                pending: action.payload,
            }

        case "SET_NOTICE":
            return {
                ...state,
                data: action.notices
            }

        default: return state
    }
}

export const actions = {
    setNoticePending: (payload: boolean) => ({type: "SET_NOTICE_PENDING", payload} as const),
    setNotices: (notices: INotices) => ({type: "SET_NOTICE", notices} as const)
}

type ActionsType = InferActionsTypes<typeof actions>


export const getNoticesThunk = () => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        NoticeAPI.getNotices().then((notices: INotices) => {
            dispatch(actions.setNotices(notices))
        })
    }
}

// export const addNotebooksThunk = (name: string) => {
//     return (dispatch: any) => {
//         // NotebookAPI.addBook(name).then(() => {
//         //     dispatch(getNotebooksThunk())
//         // })
//     }
// }

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export default noticeReducer;