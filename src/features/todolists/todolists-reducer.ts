import {Dispatch} from "redux";
import {todolistAPI, TodolistType} from "../../dal/api";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer =
    (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":{
            return action.todolists.map(todo => ({...todo, filter: "all"}))
        }
        default:
            return state
    }
}
// Action
export const setTodolists = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)
export const removeTodoList = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolist = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitle = (title: string, id: string) => ({type: 'CHANGE-TODOLIST-TITLE', title, id} as const)
export const changeTodolistFilter = (filter: FilterType, id: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter, id} as const)
// Thunk
export const fetchTodolists = () => (dispatch: Dispatch<ActionType>) => {
        todolistAPI.getTodolists()
            .then(res => dispatch(setTodolists(res.data)))
}
export const deleteTodolis = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodoList(todolistId))
            })
}
export const createTodolist = (title: string) => (dispatch: Dispatch<ActionType>) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolist(res.data.data.item))
            })
}
export const updateTodolis = (id: string, title: string) => (dispatch: Dispatch<ActionType>) => {
        todolistAPI.updateTodolist(id, title)
            .then( () => {
                dispatch(changeTodolistTitle(id, title))
            })
}
//types
type ActionType =
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof setTodolists>
export type FilterType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterType
}