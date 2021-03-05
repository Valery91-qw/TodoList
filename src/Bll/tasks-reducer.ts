import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../Dal/api";


type ActionType = removeTaskActionType | addTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | addTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todoId,
                order: 0, addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: ''}
            let copyState = {...state}
            copyState[action.todoId] = [newTask, ...copyState[action.todoId]]
            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todoId]: state[action.todoId].map(task => {
                    if (task.id !== action.taskId) return task
                    else return {...task, status: action.status}
                })
            }
        }
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.todoId]: state[action.todoId].map(task => task.id === action.taskId ? {...task, title: action.title} : task)}
        case 'ADD-TODOLIST': {
            return {...state, [action.todoId]:[]}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.todoId]
            return copyState
        }
        default:
            return state
    }
}

type removeTaskActionType = ReturnType<typeof removeTask>
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatus>
type addTaskActionType = ReturnType<typeof addTask>
type changeTaskTitleActionType = ReturnType<typeof changeTaskTitle>

export const removeTask = (taskId: string, todoId: string) => ({type: 'REMOVE-TASK', taskId, todoId} as const)
export const addTask = (title: string, todoId: string) => ({type: 'ADD-TASK', title, todoId} as const)
export const changeTaskStatus = (status: TaskStatuses, todoId: string, taskId: string) => ({type: 'CHANGE-TASK-STATUS', status, todoId, taskId} as const)
export const changeTaskTitle = (title: string, todoId: string, taskId: string) => ({type: 'CHANGE-TASK-TITLE', title, todoId, taskId} as const)