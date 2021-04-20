import { IReducer } from '../interfaces/basic'
import {IDocument, INotebookPage} from '../interfaces/notebooks'
import {actions as aNotebooks} from './notebook-reducer';
import {AppStateType, BaseThunkType, InferActionsTypes} from './state'
import {NotebookAPI} from '../api/notebookAPI';
import {actions as nActions} from './notebook-reducer';
import {message} from 'antd';


let initialState: IReducer<IDocument> = {
    pending: false,
    error: '',
    data: {
        activeDocument: null,
        prevBody: '',
        prevTitle: ''
    }
}

const documentReducer = (state = initialState, action: ActionsType): IReducer<IDocument>  => {
    switch(action.type){
        case 'SET_ACTIVE_PAGE':
            return {
                ...state,
                data: {
                    ...state.data,
                    activeDocument: action.payload
                }
            }

        case 'SET_PAGE_PENDING':
            return {
                ...state,
                pending: action.payload
            }

        case 'SET_TITLE': {
            if(state.data.activeDocument === null) return state

            return {
                ...state,
                data: {
                    ...state.data,
                    activeDocument: {...state.data.activeDocument, title: action.symbol}
                }
            }
        }

        case 'SET_ERROR':
            return {
                ...state,
                error: action.message
            }

        case 'SET_PREV':
            return {
                ...state,
                data: {
                    ...state.data,
                    prevBody: action.payload.body,
                    prevTitle: action.payload.title
                }
            }

        default: return state
    }
}

export const actions = {
    setActiveDocument: (payload: INotebookPage) => ({type: 'SET_ACTIVE_PAGE', payload} as const),
    setPending: (payload: boolean) => ({type: 'SET_PAGE_PENDING', payload} as const),
    setTitle: (symbol: string) => ({type:'SET_TITLE', symbol} as const),
    setError: (message: string) => ({type: 'SET_ERROR', message} as const),
    setPrev: (payload: {body: string, title: string}) => ({type: 'SET_PREV', payload} as const)
}

type ActionsType = InferActionsTypes<typeof actions>

export const getNotebookPageThunk = (nid: string, page: string) => {
    return (dispatch: any) => {
        dispatch(actions.setPending(true))
        dispatch(nActions.setPending(true))
        NotebookAPI.getPage(nid, page).then(res => {
            if(res.status === 200){
                dispatch(actions.setActiveDocument(res.data))
                dispatch(actions.setPrev({body: res.data.body, title: res.data.title}))
            }
        }).catch(() => {
            dispatch(actions.setError("Network error"))
        }).finally(() => {
            dispatch(actions.setPending(false))
            dispatch(nActions.setPending(false))
        })
    }
}

export const saveChangesThunk = (editorState: any) => {
    return (dispatch: any, getState: () => AppStateType) =>{
        const state = getState()

        const {selectedNotebooks} = state.notebooks.data
        const {activeDocument, prevBody, prevTitle} = state.document.data

        if(selectedNotebooks && activeDocument !==null) {
            const body = JSON.stringify(editorState)

            if(prevBody !== body || prevTitle !==activeDocument.title){
                dispatch(actions.setPending(true))

                NotebookAPI.putPageChanges(selectedNotebooks.id, activeDocument.id, body, activeDocument.title).then((res) => {
                    if (prevTitle !==activeDocument.title) {

                        let temp = {...selectedNotebooks, pages: [...selectedNotebooks.pages]}

                        //@ts-ignore
                        temp.pages = selectedNotebooks.pages.map((item: INotebookPage) => {
                            if (item.id === activeDocument.id) {
                                item.title = activeDocument.title
                            }
                            return item
                        })

                        dispatch(aNotebooks.setSelectedNotebook(temp))
                    }
                }).catch(err => {
                    // message.error("Something went wrong")
                }).finally(() => {
                    dispatch(actions.setPending(false))
                })
            }
        }
    }
}

export const deletePage = (notebookId: string, pid: string) => {
    return (dispatch: any) => {
        dispatch(nActions.setPending(true))
        NotebookAPI.deletePage(notebookId, pid).then(() => {
            NotebookAPI.getNotebooks().then((notebooks: any) => {
                dispatch(nActions.setNotebooks(notebooks))
                dispatch(nActions.setPending(false))
            })
        })
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export default documentReducer