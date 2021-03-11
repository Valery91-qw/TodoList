import {authAPI} from "../dal/api";
import {Dispatch} from "redux";
import {setIsLoggedIn} from "../features/login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: initialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{error: string | null}>){
            state.error = action.payload.error
        },
        setAppInitialized(state, action: PayloadAction<{value: boolean}>){
            state.isInitialized = action.payload.value
        }
    }
})

export const appReducer = slice.reducer

export const {setAppStatus, setAppError, setAppInitialized } = slice.actions

export const initializeApp = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status :'loading'}))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}));
            dispatch(setAppStatus({ status: 'succeeded'}))
        }
        else {
            handleServerAppError(res.data, dispatch)
        }
        dispatch(setAppInitialized({value: true}));
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}