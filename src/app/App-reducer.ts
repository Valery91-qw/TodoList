import {authAPI} from "../dal/api";
import {setIsLoggedIn} from "../features/login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//thunk
export const initializeApp = createAsyncThunk('app/initialize', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        const res = await authAPI.me()
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedIn({value: true}));
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
        return {value: true}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
    }
})
// initialState
const initialState: initialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
//reducer
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
    },
    extraReducers: (builder) => {
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            if(action.payload)
           state.isInitialized = action.payload.value
        });
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError} = slice.actions

//type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}