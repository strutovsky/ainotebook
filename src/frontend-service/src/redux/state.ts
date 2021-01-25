import {combineReducers, createStore, applyMiddleware, Action} from "redux";
import thunkMiddleWare, {ThunkAction} from "redux-thunk";
import notebookReducer from "./notebook-reducer";

let reducers = combineReducers({
    notebooks: notebookReducer
})

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
// @ts-ignore
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

type PropertiesType<T> = T extends {[key: string]: infer U} ? U: never
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=> any}> = ReturnType<PropertiesType<T>>

// @ts-ignore
//window._market = store;

export default store;