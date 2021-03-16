import {setAppStatus} from "../../app/App-reducer";
import {authAPI, LoginDataRequestType} from "../../dal/api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
//thunk
export const login = createAsyncThunk('auth/login', async (param: LoginDataRequestType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        const res = await authAPI.login(param)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({error: res.data.messages[0]})
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({error: error.message})
    }
});
export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        let res = await authAPI.logout()
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
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
                state.isLoggedIn = true
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = false
        });
    }
})

export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions


