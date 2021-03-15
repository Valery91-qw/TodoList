import { combineReducers} from "redux";
import {tasksReducer} from "../features/todolists/todolist/task/tasks-reducer";
import {todolistsReducer} from "../features/todolists/todolists-reducer";
import thunk from "redux-thunk";
import { appReducer } from "./App-reducer";
import {authReducer} from "../features/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootStateType = ReturnType<typeof rootReducer>

