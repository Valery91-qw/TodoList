import {todolistAPI, TodolistType} from "../../dal/api";
import {RequestStatusType, setAppStatus} from "../../app/App-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

// thunk
export const fetchTodolists = createAsyncThunk('todolists/fetchTodolists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistAPI.getTodolists()
    try {
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        thunkAPI.dispatch(setTodolists({todolists: res.data}))
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
    }
})
export const deleteTodolis = createAsyncThunk('todolists/deleteTodolist', async (param: { todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatus({id: param.todolistId, entityStatus: 'loading'}))
    const res = await todolistAPI.deleteTodolist(param.todolistId)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(removeTodoList({id: param.todolistId}))
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
    }
})
export const createTodolist = createAsyncThunk('todolists/createTodolist', async (param: { title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistAPI.createTodolist(param.title)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(addTodolist({todolist: res.data.data.item}))
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
    }
})
export const updateTodolis = createAsyncThunk('todolists/updateTodolist', async (param: { id: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistAPI.updateTodolist(param.id, param.title)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(changeTodolistTitle({id: param.id, title: param.title}))
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
    }
})

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        setTodolists(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            let index = state.findIndex(todo => todo.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
        removeTodoList(state, action: PayloadAction<{ id: string }>) {
            let index = state.findIndex(todo => todo.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitle(state, action: PayloadAction<{ title: string, id: string }>) {
            let index = state.findIndex(todo => todo.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilter(state, action: PayloadAction<{ filter: FilterType, id: string }>) {
            let index = state.findIndex(todo => todo.id === action.payload.id)
            state[index].filter = action.payload.filter
        }
    }
})

export const todolistsReducer = slice.reducer

export const {
    setTodolists,
    changeTodolistEntityStatus,
    addTodolist,
    changeTodolistTitle,
    changeTodolistFilter,
    removeTodoList } = slice.actions

//types
export type FilterType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}