import {AppStateType} from '../state';

export const getAppErrorSelector = (state: AppStateType) => (state.app.error)