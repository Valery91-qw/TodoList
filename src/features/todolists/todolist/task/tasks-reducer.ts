import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../../../dal/api";
import {Dispatch} from "redux";
import {addTodolist, changeTodolistEntityStatus, removeTodoList, setTodolists} from "../../todolists-reducer";
import {RootStateType} from "../../../../app/store";
import {setAppStatus} from "../../../../app/App-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setTasks(state, action:PayloadAction<{tasks: Array<TaskType>, todoId: string }>) {
            state[action.payload.todoId] = action.payload.tasks
        },
        removeTask(state, action:PayloadAction<{todoId: string, taskId: string}>) {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if(index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTask (state, action:PayloadAction<{task: TaskType}>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action:PayloadAction<{todoId: string, taskId: string, model: UpdateDomainTaskModelType}>) {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if(index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        }
    },
    extraReducers:(builder) => {
        builder.addCase(addTodolist, (state, action) => {
                state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodoList,(state, action) => {
                delete state[action.payload.id]
        });
        builder.addCase(setTodolists, (state, action) => {
                action.payload.todolists.forEach(todo =>{
                    debugger
                    state[todo.id] = []
                })
        });
    }
})

export const tasksReducer = slice.reducer

export const {
    updateTaskAC,
    addTask ,
    setTasks,
    removeTask } = slice.actions
//Thunk creator
export const fetchTasks = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: 'loading'}))
        tasksAPI.getTasks(todoId)
            .then(res => {
                dispatch(setTasks({ tasks: res.data.items, todoId}))
                dispatch(setAppStatus({ status: 'succeeded'}))
            })
}
export const deleteTask = (taskId: string, todoId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({id: todoId,entityStatus:  'loading'}))
        tasksAPI.deleteTask(todoId, taskId)
            .then( res => {
                if(res.data.resultCode === 0) {
                    dispatch(removeTask({todoId, taskId}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                    dispatch(changeTodolistEntityStatus({id: todoId, entityStatus: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
}
export const createTask = (todoId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: 'loading'}))
    dispatch(changeTodolistEntityStatus({id: todoId, entityStatus: 'loading'}))
        tasksAPI.createTask(todoId, title)
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(addTask({task: res.data.data.item}))
                    dispatch(setAppStatus({ status: 'succeeded'}))
                    dispatch(changeTodolistEntityStatus({id: todoId, entityStatus: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeTodolistEntityStatus({id: todoId, entityStatus:  'succeeded'}))
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
}
export const updateTask = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => RootStateType) => {
        dispatch(setAppStatus({ status: 'loading'}))
        dispatch(changeTodolistEntityStatus({id: todoId, entityStatus :'loading'}))
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
                if(res.data.resultCode === 0) {
                    dispatch(updateTaskAC({todoId, taskId, model: apiModel}))
                    dispatch(setAppStatus({ status:'succeeded'}))
                    dispatch(changeTodolistEntityStatus({id: todoId, entityStatus: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}