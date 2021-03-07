import { Dispatch } from 'redux'
import {setAppError, setAppStatus} from "../../app/App-reducer";
import {authAPI, LoginDataRequestType} from "../../dal/api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)
// thunks
export const loginTC = (data: LoginDataRequestType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    authAPI.login(data)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logout = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
type ActionsType =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
type InitialStateType = {
    isLoggedIn: boolean
}
