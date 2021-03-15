import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../../../dal/api";
import {Dispatch} from "redux";
import {addTodolist, changeTodolistEntityStatus, removeTodoList, setTodolists} from "../../todolists-reducer";
import {RootStateType} from "../../../../app/store";
import {setAppStatus} from "../../../../app/App-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}
// thunk
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todoId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await tasksAPI.getTasks(todoId)
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    return {tasks: res.data.items, todoId}
})
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (param: {taskId: string, todoId: string}, thunkAPI) => {
    await tasksAPI.deleteTask(param.todoId, param.taskId)
    return {todoId: param.todoId, taskId: param.taskId}
})
// reducer
const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
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
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todoId] = action.payload.tasks
            });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoId]
                    const index = tasks.findIndex(task => task.id === action.payload.taskId)
                    if (index > -1) {
                        tasks.splice(index, 1)
                    }
        });
    }
});

export const tasksReducer = slice.reducer

export const {
    updateTaskAC,
    addTask } = slice.actions
//Thunk
// export const _fetchTasks = (todoId: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatus({ status: 'loading'}))
//         tasksAPI.getTasks(todoId)
//             .then(res => {
//                 dispatch(setTasks({ tasks: res.data.items, todoId}))
//                 dispatch(setAppStatus({ status: 'succeeded'}))
//             })
// }
// export const _deleteTask = (taskId: string, todoId: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatus({status: 'loading'}))
//     dispatch(changeTodolistEntityStatus({id: todoId,entityStatus:  'loading'}))
//         tasksAPI.deleteTask(todoId, taskId)
//             .then( res => {
//                 if(res.data.resultCode === 0) {
//                     dispatch(removeTask({todoId, taskId}))
//                     dispatch(setAppStatus({status: 'succeeded'}))
//                     dispatch(changeTodolistEntityStatus({id: todoId, entityStatus: 'succeeded'}))
//                 } else {
//                     handleServerAppError(res.data, dispatch)
//                 }
//             })
//             .catch((error) => {
//                 handleServerNetworkError(error, dispatch)
//             })
// }
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