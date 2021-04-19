import {AppStateType} from '../state';

export const getActivePageSelector = (state: AppStateType) => (state.document.data.activeDocument)
export const getActivePageTitleSelector = (state: AppStateType) => (state.document.data)
export const getActivePageBodySelector = (state: AppStateType) => (state.document.data.activeDocument?.body)
export const getDocumentErrorSelector = (state: AppStateType) => (state.document.error)
export const getDocumentPendingSelector = (state: AppStateType) => (state.document.pending)