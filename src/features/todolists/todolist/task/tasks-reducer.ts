import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../../../dal/api";
import {Dispatch} from "redux";
import {addTodolist, removeTodoList, setTodolists} from "../../todolists-reducer";
import {RootStateType} from "../../../../app/store";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {...state, [action.todoId]: state[action.todoId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]:[]}
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "SET-TASKS": {
            return {...state, [action.todoId]: action.tasks}
        }
        default:
            return state
    }
}
// Action creator
export const setTasks = (tasks: Array<TaskType>, todoId: string) => ({type: 'SET-TASKS', tasks, todoId} as const)
export const removeTask = (todoId: string, taskId: string) => ({type: 'REMOVE-TASK', todoId, taskId} as const)
export const addTask = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (todoId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({
    type: 'UPDATE-TASK', todoId, taskId, model
} as const)
//Thunk creator
export const fetchTasks = (todoId: string) => (dispatch: Dispatch<ActionType>) => {
        tasksAPI.getTasks(todoId)
            .then(res => {
                dispatch(setTasks(res.data.items, todoId))
            })
}
export const deleteTask = (taskId: string, todoId: string) => (dispatch: Dispatch<ActionType>) => {
        tasksAPI.deleteTask(todoId, taskId)
            .then(() => {
                dispatch(removeTask(todoId, taskId))
            })
}
export const createTask = (todoId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
        tasksAPI.createTask(todoId, title)
            .then(res => dispatch(addTask(res.data.data.item)))
}
export const updateTask = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch<ActionType>, getState: () => RootStateType) => {
        const state = getState()
        const task = state.tasks[todoId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        tasksAPI.updateTask(todoId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todoId, taskId, apiModel))
            })
    }
}
//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ActionType =
    | ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof setTasks>

export type TasksStateType = {
    [key: string]: Array<TaskType>
}