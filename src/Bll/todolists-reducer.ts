import {v1} from "uuid";
import {TodolistType} from "../Dal/api";

type ActionType = RemoveTodolistActionType | addTodolistActionType | changeTodolistTitleActionType | changeTodolistFilterActionType

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
            let newTodolistId: string = action.todoId;
            let newTodolist: TodolistDomainType = {id: newTodolistId, title: action.title, filter: 'all', addedDate: '', order: 0 }
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoId ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodoList>
export type addTodolistActionType = ReturnType<typeof addTodolist>
type changeTodolistTitleActionType = ReturnType<typeof changeTodolistTitle>
type changeTodolistFilterActionType = ReturnType<typeof changeTodolistFilter>

export const removeTodoList = (todoId: string) => ({type: 'REMOVE-TODOLIST', todoId} as const)
export const addTodolist = (title: string) => ({type: 'ADD-TODOLIST', title, todoId: v1()} as const)
export const changeTodolistTitle = (title: string, todoId: string) => ({type: 'CHANGE-TODOLIST-TITLE', title, todoId} as const)
export const changeTodolistFilter = (filter: FilterType, todoId: string) => ({type: 'CHANGE-TODOLIST-FILTER', filter, todoId} as const)