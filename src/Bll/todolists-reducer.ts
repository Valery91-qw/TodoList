import {TodolistType} from "../App";
import {v1} from "uuid";
import {FilterType} from "../component/Todolist";

type ActionType = RemoveTodolistActionType | addTodolistActionType | changeTodolistTitleActionType | changeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.todoId)
        case 'ADD-TODOLIST':
            let newTodolistId: string = action.todoId;
            let newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter: 'all'}
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoId ? {...tl, filter: action.filter} : tl)
        default:
            throw new Error("I don't understand this type")
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