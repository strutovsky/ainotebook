import {AppStateType} from '../state';

export const getAppErrorSelector = (state: AppStateType) => (state.app.error)
export const getLangSelector = (state: AppStateType) => (state.app.data.lang)
export const getIsLoginedSelector = (state: AppStateType) => (state.app.data.isLogined)
export const getAppPendingSelector = (state: AppStateType) => (state.app.pending)