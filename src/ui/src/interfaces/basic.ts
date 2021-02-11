export interface IReducer<T>{
    pending: boolean
    data: T
    error: boolean
}