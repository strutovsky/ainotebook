import {INotebook, INotebookPage, INotebooks} from '../interfaces/notebooks';
import {IReducer} from "../interfaces/basic";
import { InferActionsTypes, BaseThunkType } from "./state";
import {Dispatch} from "redux";
import {NotebookAPI} from "../api/notebookAPI";


let initState: IReducer<INotebooks> = {
    pending: false,
    error: false,
    data: {
        selectedNotebooks: null,
        notebooks: [],
        activePage: null
    },
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
                ...state, data: {notebooks: action.notebooks}
          }

        case 'SET_PENDING':
            return {
                ...state,
                pending: action.payload
            }

        case 'SET_SELECTED_NOTEBOOK':
            return {
                ...state,
                data: {...state.data,selectedNotebooks: action.payload}
            }

        case 'SET_ACTIVE_NOTEBOOK_PAGE':
            return {
                ...state,
                data: {...state.data, activePage: action.page}
            }

        default: return state

    }
}

export const actions = {
    setNotebooksPending: (payload: boolean) => ({type: "SET_NOTEBOOK_PENDING", payload} as const),
    setNotebooks: (notebooks: INotebook[]) => ({type: "SET_NOTEBOOKS", notebooks} as const),
    setPending: (payload: boolean) => ({type: "SET_PENDING", payload} as const),
    setSelectedNotebook: (payload: INotebook | null) => ({type: "SET_SELECTED_NOTEBOOK", payload} as const),
    setActivePage: (page: INotebookPage | null) => ({type: "SET_ACTIVE_NOTEBOOK_PAGE", page} as const)

}

type ActionsType = InferActionsTypes<typeof actions>


export const getNotebooksThunk = () => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(actions.setPending(true))
        NotebookAPI.getNotebooks().then((notebooks: any) => {
            dispatch(actions.setNotebooks(notebooks))
            dispatch(actions.setPending(false))
        })

    }
}

export const addNotebooksThunk = (name: string) => {
    return (dispatch: any) => {
        NotebookAPI.addBook(name).then(() => {
            dispatch(getNotebooksThunk())
        }).catch((err) => {
            debugger
        })
    }
}

export const getNotebookPageThunk = (nid: string, page: string) => {
    return (dispatch: any) => {
        NotebookAPI.getPage(nid, page).then(res => {
            dispatch(actions.setActivePage(res.data))
        })
    }
}

export const addPageThunk = (notebookId: number) =>{
    return (dispatch: any) => {
        NotebookAPI.addPage(notebookId).then(res => {
            debugger
        })
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export default notebookReducer;