import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../../../dal/api";
import {addTodolist, changeTodolistEntityStatus, removeTodoList, setTodolists} from "../../todolists-reducer";
import {RootStateType} from "../../../../app/store";
import {setAppStatus} from "../../../../app/App-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}
// thunk
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todoId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await tasksAPI.getTasks(todoId)
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    return {tasks: res.data.items, todoId}
})
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (param: {taskId: string, todoId: string}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatus({id: param.todoId, entityStatus: 'loading'}))
        const res = await tasksAPI.deleteTask(param.todoId, param.taskId)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            thunkAPI.dispatch(changeTodolistEntityStatus({id: param.todoId, entityStatus: 'succeeded'}))
            return {todoId: param.todoId, taskId: param.taskId}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            thunkAPI.dispatch(changeTodolistEntityStatus({id: param.todoId, entityStatus: 'succeeded'}))
            return thunkAPI.rejectWithValue({error: res.data.messages[0]})
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({error: error.message})
    }

})
export const createTask = createAsyncThunk('tasks/createTask', async (param: { todoId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatus({id: param.todoId, entityStatus: 'loading'}))
        const res = await tasksAPI.createTask(param.todoId, param.title)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            thunkAPI.dispatch(changeTodolistEntityStatus({id: param.todoId, entityStatus: 'succeeded'}))
            return  {task: res.data.data.item}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            thunkAPI.dispatch(changeTodolistEntityStatus({id: param.todoId, entityStatus: 'succeeded'}))
            return thunkAPI.rejectWithValue({error: res.data.messages[0]})
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({error: error.message})
    }
})
export const updateTask = createAsyncThunk('tasks/updateTask', async (
    param: { todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatus({id: param.todoId, entityStatus: 'loading'}))
    const state = thunkAPI.getState() as RootStateType
    const task = state.tasks[param.todoId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.domainModel
    }
    const res = await tasksAPI.updateTask(param.todoId, param.taskId, apiModel)
    try {
                if (res.data.resultCode === 0) {
                    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
                    thunkAPI.dispatch(changeTodolistEntityStatus({id: param.todoId, entityStatus: 'succeeded'}))
                    return param
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue({error: res.data.messages[0]})
                }
    } catch(error) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({error: error.message})
        }
})
// reducer
const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(addTodolist, (state, action) => {
                state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodoList,(state, action) => {
                delete state[action.payload.id]
        });
        builder.addCase(setTodolists, (state, action) => {
                action.payload.todolists.forEach(todo =>{
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
        builder.addCase(createTask.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if(index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        });
    }
});
export const tasksReducer = slice.reducer
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