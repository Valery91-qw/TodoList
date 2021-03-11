import {Dispatch} from "redux";
import {todolistAPI, TodolistType} from "../../dal/api";
import {RequestStatusType, setAppStatus} from "../../app/App-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolist',
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
// Thunk
export const fetchTodolists = () => (dispatch: Dispatch) => {
        dispatch(setAppStatus({ status: 'loading'}))
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(setTodolists({ todolists: res.data}))
                dispatch(setAppStatus({ status: 'succeeded'}))
            })
}
export const deleteTodolis = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: 'loading'}))
    dispatch(changeTodolistEntityStatus({id: todolistId, entityStatus: 'loading'}))
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                if( res.data.resultCode === 0) {
                    dispatch(removeTodoList({id: todolistId}))
                    dispatch(setAppStatus({ status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
}
export const createTodolist = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
        todolistAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolist({todolist: res.data.data.item}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
}
export const updateTodolis = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
        todolistAPI.updateTodolist(id, title)
            .then( res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitle({id, title}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
}
//types
export type FilterType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}