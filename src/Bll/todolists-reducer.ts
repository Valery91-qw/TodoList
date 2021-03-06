import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../Dal/api";
import {Dispatch} from "redux";

type ActionType = RemoveTodolistActionType | addTodolistActionType | changeTodolistTitleActionType | changeTodolistFilterActionType
    | setTodolistsActionType

export type FilterType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.todoId)
        case 'ADD-TODOLIST':
            let newTodolistId: string = action.todolist.id;
            let newTodolist: TodolistDomainType = {id: newTodolistId, title: action.todolist.title, filter: 'all', addedDate: '', order: 0 }
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoId ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":{
            return action.todolists.map(todo => ({
                ...todo,
                filter: "all"
            }))
        }
        default:
            return state
    }
}
// Action type
export type RemoveTodolistActionType = ReturnType<typeof removeTodoList>
export type addTodolistActionType = ReturnType<typeof addTodolist>
type changeTodolistTitleActionType = ReturnType<typeof changeTodolistTitle>
type changeTodolistFilterActionType = ReturnType<typeof changeTodolistFilter>
export type setTodolistsActionType = ReturnType<typeof setTodolists>
// Action creator
export const setTodolists = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)
export const removeTodoList = (todoId: string) => ({type: 'REMOVE-TODOLIST', todoId} as const)
export const addTodolist = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitle = (title: string, todoId: string) => ({type: 'CHANGE-TODOLIST-TITLE', title, todoId} as const)
export const changeTodolistFilter = (filter: FilterType, todoId: string) => ({type: 'CHANGE-TODOLIST-FILTER', filter, todoId} as const)
// Thunk creator
export const fetchTodolists = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then(res => dispatch(setTodolists(res.data)))
    }
}
export const deleteTodolis = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodoList(todolistId))
            })
    }
}
export const createTodolist = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolist(res.data.data.item))
            })
    }
}
export const updateTodolis = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitle(id, title))
            })
    }
}