import React from "react";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/todolists/todolist/task/tasks-reducer";
import {todolistsReducer} from "../../features/todolists/todolists-reducer";
import {v1} from "uuid";
import {RootStateType} from "../../app/store";
import {TaskPriorities, TaskStatuses} from "../../dal/api";
import {appReducer} from "../../app/App-reducer";
import {authReducer} from "../../features/login/auth-reducer";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: RootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'loading', addedDate: '', order: 0}
    ] ,
    tasks: {
        "todolistId1": [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            {id: v1(), title: "Milk", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookstore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookstore}>
        {storyFn()}
    </Provider>
)