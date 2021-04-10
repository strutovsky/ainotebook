export interface IReducer<T>{
    pagePending?:boolean
    pending: boolean
    data: T
    error: string
}