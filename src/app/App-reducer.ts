import {authAPI} from "../dal/api";
import {Dispatch} from "redux";
import {setIsLoggedIn} from "../features/login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: initialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

//Action
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInitialized = (value: boolean) => ({type: 'APP/SET-IS-INITIALIED', value} as const)
//thunk
export const initializeApp = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true));
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
        dispatch(setAppInitialized(true));
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
// Types
type ActionsType =
    | ReturnType<typeof setAppInitialized>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type initialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}