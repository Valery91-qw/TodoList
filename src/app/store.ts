import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/todolists/todolist/task/tasks-reducer";
import {todolistsReducer} from "../features/todolists/todolists-reducer";
import thunk from "redux-thunk";
import { appReducer } from "./App-reducer";
import {authReducer} from "../features/login/auth-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootStateType = ReturnType<typeof rootReducer>