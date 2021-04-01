import {INotebooks} from "../interfaces/notebooks";
import {IReducer} from "../interfaces/basic";
import { InferActionsTypes, BaseThunkType } from "./state";
import {Dispatch} from "redux";
import {NotebookAPI} from "../api/notebookAPI";


let initState: IReducer<INotebooks> = {
    pending: false,
    error: false,
    data: []
}


const notebookReducer = (state = initState, action: ActionsType): IReducer<INotebooks>  => {
    switch(action.type){
        case "SET_NOTEBOOK_PENDING":
            return {
                ...state,
                pending: action.payload,
            }

        case "SET_NOTEBOOKS":
            return {
                ...state,
                data: action.notebooks
            }

        case 'SET_PENDING':
            return {
                ...state,
                pending: action.payload
            }

        default: return state

    }
}

export const actions = {
    setNotebooksPending: (payload: boolean) => ({type: "SET_NOTEBOOK_PENDING", payload} as const),
    setNotebooks: (notebooks: INotebooks) => ({type: "SET_NOTEBOOKS", notebooks} as const),
    setPending: (payload: boolean) => ({type: "SET_PENDING", payload} as const)
}

type ActionsType = InferActionsTypes<typeof actions>


export const getNotebooksThunk = () => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(actions.setPending(true))
        NotebookAPI.getNotebooks().then((notebooks: INotebooks) => {
            dispatch(actions.setNotebooks(notebooks))
            dispatch(actions.setPending(false))
        })

    }
}

export const addNotebooksThunk = (name: string) => {
    return (dispatch: any) => {
        NotebookAPI.addBook(name).then(() => {
            dispatch(getNotebooksThunk())
        })
    }
}

export const addPageThunk = (notebookId: number, title: string) =>{
    return (dispatch: any) => {
        NotebookAPI.addPage(notebookId, title).then(res => {
            debugger
        })
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export default notebookReducer;