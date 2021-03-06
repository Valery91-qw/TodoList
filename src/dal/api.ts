import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers:  {
        'API-KEY': 'fc503820-69cf-441a-add2-ccdccedc3a76'
    }
})

export const todolistAPI = {
    updateTodolist(todoId: string, title: string) {
       return  instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
    },
    getTodolists() {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`, {title})
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    }
}
export const tasksAPI = {
    updateTask(todoId: string, taskId: string, model: UpdateTaskModelType) {
        return  instance.put<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`, model)
    },
    getTasks(todoId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todoId}/tasks`, {title})
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    }
}
export const authAPI = {
    login(data: LoginDataRequestType) {
        return instance.post<ResponseType<{userId?: number}>>(`auth/login`, data)
    },
    me() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>(`auth/me`)
    },
    logout() {
        return instance.delete<ResponseType<{userId?: number}>>('auth/login');
    },
}
// types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export enum TaskStatuses  {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type LoginDataRequestType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}