import { IReducer } from '../interfaces/basic'
import {IDocument, INotebookPage} from '../interfaces/notebooks'
import {AppStateType, BaseThunkType, InferActionsTypes} from './state'
import {NotebookAPI} from '../api/notebookAPI';
import {message} from 'antd';
import {getNotebookThunk} from './notebook-reducer';


let initialState: IReducer<IDocument> = {
    pending: false,
    error: '',
    data: {
        activeDocument: null,
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

        case 'SET_BODY': {
            if(state.data.activeDocument === null) return state

            return {
                ...state,
                data: {
                    ...state.data,
                    activeDocument: {...state.data.activeDocument, body: action.body}
                }
            }
        }

        case 'SET_ERROR':
            return {
                ...state,
                error: action.message
            }

        default: return state
    }
}

export const actions = {
    setActiveDocument: (payload: INotebookPage) => ({type: 'SET_ACTIVE_PAGE', payload} as const),
    setPending: (payload: boolean) => ({type: 'SET_PAGE_PENDING', payload} as const),
    setTitle: (symbol: string) => ({type:'SET_TITLE', symbol} as const),
    setBody: (body: string) => ({type: 'SET_BODY', body} as const),
    setError: (message: string) => ({type: 'SET_ERROR', message} as const)
}

type ActionsType = InferActionsTypes<typeof actions>

export const getNotebookPageThunk = (nid: string, page: string) => {
    return (dispatch: any) => {
        dispatch(actions.setPending(true))
        NotebookAPI.getPage(nid, page).then(res => {
            dispatch(actions.setActiveDocument(res.data))
            dispatch(actions.setPending(false))
        }).catch(err => {
            dispatch(actions.setError("Network error"))
        })
    }
}

export const saveChangesThunk = (editorState: any) => {
    return (dispatch: any, getState: () => AppStateType) =>{
        const state = getState()
        if(state.notebooks.data.selectedNotebooks && state.document.data.activeDocument !==null) {
            const {activeDocument} = state.document.data
            NotebookAPI.putPageChanges(
                state.notebooks.data.selectedNotebooks.id,
                activeDocument?.id,
                JSON.stringify(editorState),
                activeDocument?.title).then(()=> {
                // if(state.notebooks.data.selectedNotebooks) dispatch(getNotebookThunk(state.notebooks.data.selectedNotebooks.id))
            })
        }
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export default documentReducer