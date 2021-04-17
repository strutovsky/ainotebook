import {AppStateType} from '../state';

export const getAppErrorSelector = (state: AppStateType) => (state.app.error)
export const getLangSelector = (state: AppStateType) => (state.app.data.lang)