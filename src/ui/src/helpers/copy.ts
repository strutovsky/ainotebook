import {AppStateType} from '../redux/state';

export function copy(state: any) {
    return JSON.parse(JSON.stringify(state))
}