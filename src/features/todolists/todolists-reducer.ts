import {Dispatch} from "redux";
import {todolistAPI, TodolistType} from "../../dal/api";
import {RequestStatusType, setAppError, setAppStatus} from "../../app/App-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer =
    (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
        case "SET-TODOLISTS":{
            return action.todolists.map(todo => ({...todo, filter: "all", entityStatus: "idle"}))
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(todo => todo.id === action.id ? {...todo, entityStatus: action.entityStatus} : todo)
        default:
            return state
    }
}
// Action
export const setTodolists = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistEntityStatus = (id: string, entityStatus: RequestStatusType) => ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const)
export const removeTodoList = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolist = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitle = (title: string, id: string) => ({type: 'CHANGE-TODOLIST-TITLE', title, id} as const)
export const changeTodolistFilter = (filter: FilterType, id: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter, id} as const)
// Thunk
export const fetchTodolists = () => (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatus('loading'))
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(setTodolists(res.data))
                dispatch(setAppStatus('succeeded'))
            })
}
export const deleteTodolis = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTodolistEntityStatus(todolistId, 'loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                if( res.data.resultCode === 0) {
                    dispatch(removeTodoList(todolistId))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
}
export const createTodolist = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatus('loading'))
        todolistAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolist(res.data.data.item))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
}
export const updateTodolis = (id: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatus('loading'))
        todolistAPI.updateTodolist(id, title)
            .then( res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitle(id, title))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
}
//types
type ActionType =
    | ReturnType<typeof changeTodolistEntityStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof setTodolists>
export type FilterType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}