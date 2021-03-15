import { Dispatch } from 'redux'
import {setAppStatus} from "../../app/App-reducer";
import {authAPI, LoginDataRequestType} from "../../dal/api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
//thunk
export const login = createAsyncThunk('auth/login', async (param: LoginDataRequestType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({error: res.data.messages[0]})
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({error: error.message})
    }
})
// reducer
const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
        });
    }
})

export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions
// thunks
// export const _loginTC = (data: LoginDataRequestType) => (dispatch: Dispatch) => {
//     dispatch(setAppStatus({ status: 'loading'}))
//     authAPI.login(data)
//         .then(res => {
//             if(res.data.resultCode === 0) {
//                 dispatch(setIsLoggedIn({value: true}))
//                 dispatch(setAppStatus({ status: 'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
export const logout = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: false}))
                dispatch(setAppStatus({ status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


