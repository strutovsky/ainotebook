import {INotebook, INotebookPage, INotebooks} from '../interfaces/notebooks';
import {IReducer} from "../interfaces/basic";
import { InferActionsTypes, BaseThunkType } from "./state";
import {Dispatch} from "redux";
import {NotebookAPI} from "../api/notebookAPI";
import { actions as appActions } from './app-reducer';
import {message} from 'antd';


let initState: IReducer<INotebooks> = {
    pending: false,
    error: '',
    pagePending: false,
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

        case 'SET_PAGE_PENDING':
            return {
                ...state,
                pagePending: action.payload
            }

        case 'ADD_PAGES':
            if(state.data.selectedNotebooks) {
                return {
                    ...state,
                    data: {...state.data, selectedNotebooks: {...state.data.selectedNotebooks, pages: action.pages
                    }}
                }
            }else {
                return  {
                    ...state
                }
            }

        case 'CHANGE_NOTEBOOK_NAME':
            const temp = [...state.data.notebooks].map(notebook => {
                if(notebook.id === action.nid) {
                    notebook.name = action.name
                }

                return notebook
            })


            return {
                ...state,
                data: {
                    ...state.data,
                    notebooks: temp
                }
            }

        case 'ADD_NOTEBOOK':
            return {
                ...state,
                data: {
                    ...state.data,
                    notebooks: [...state.data.notebooks, action.notebook]
                }
            }


        default: return state

    }
}

export const actions = {
    setNotebooksPending: (payload: boolean) => ({type: "SET_NOTEBOOK_PENDING", payload} as const),
    setNotebooks: (notebooks: INotebook[]) => ({type: "SET_NOTEBOOKS", notebooks} as const),
    setPending: (payload: boolean) => ({type: "SET_PENDING", payload} as const),
    setSelectedNotebook: (payload: INotebook | null) => ({type: "SET_SELECTED_NOTEBOOK", payload} as const),
    setActivePage: (page: INotebookPage | null) => ({type: "SET_ACTIVE_NOTEBOOK_PAGE", page} as const),
    setPagePending: (payload: boolean) => ({type: "SET_PAGE_PENDING", payload} as const),
    addNoteBookPage: (pages: INotebookPage[]) => ({type: "ADD_PAGES", pages} as const ),
    changeNotebookName: (name: string, nid: string) => ({type: "CHANGE_NOTEBOOK_NAME", nid, name} as const),
    addNotebook: (notebook: INotebook) => ({type: 'ADD_NOTEBOOK', notebook} as const)
}

type ActionsType = InferActionsTypes<typeof actions>


export const getNotebooksThunk = () => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(actions.setPending(true))
        NotebookAPI.getNotebooks().then((notebooks: any) => {
            dispatch(actions.setNotebooks(notebooks))
            dispatch(actions.setPending(false))

        }).catch((err) => {
            // @ts-ignore
            dispatch(appActions.setErrorApp('Network Error'))
        })

    }
}

export const addNotebooksThunk = (name: string) => {
    return (dispatch: any) => {
        NotebookAPI.addBook(name).then((res) => {
            dispatch(actions.addNotebook(res.data))
        }).catch(() => {
            message.error('Some error')
        })
    }
}

export const addPageThunk = (notebookId: string, title: string) =>{
    return (dispatch: any) => {
        dispatch(actions.setPending(true))
        NotebookAPI.addPage(notebookId, title).then((res: any) => {
            NotebookAPI.getNotebooks().then((notebooks: any) => {
                dispatch(actions.setNotebooks(notebooks))
            })
        }).catch(() => {
            message.error('Can`t create page')
        }).finally(() => {
            dispatch(actions.setPending(false))
        })
    }
}

export const deleteNotebook = (notebookId: string) => {
    return (dispatch: any) => {
        dispatch(actions.setPending(true))
        NotebookAPI.deleteNotebook(notebookId).then(() => {
            NotebookAPI.getNotebooks().then((notebooks: any) => {
                dispatch(actions.setNotebooks(notebooks))
                dispatch(actions.setPending(false))
            })
        })
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export default notebookReducer;