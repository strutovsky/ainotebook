import {AppStateType} from '../state';

export const getActivePageSelector = (state: AppStateType) => (state.document.data.activeDocument)
export const getActivePageTitleSelector = (state: AppStateType) => (state.document.data.activeDocument?.title)
export const getActivePageBodySelector = (state: AppStateType) => (state.document.data.activeDocument?.body)