import {AppStateType} from '../state';

export const getNotebooksSelector = (state: AppStateType) => (state.notebooks.data.notebooks)
export const getNotebooksPending = (state: AppStateType) => (state.notebooks.pending)
export const getSelectedNotebook = (state: AppStateType) => (state.notebooks.data.selectedNotebooks)
export const getActivePage = (state: AppStateType) => (state.notebooks.data.activePage)
export const getPagePending = (state: AppStateType) => (state.notebooks.pagePending)