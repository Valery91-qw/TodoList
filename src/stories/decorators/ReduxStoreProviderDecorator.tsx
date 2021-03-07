import React from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/todolists/todolist/task/tasks-reducer";
import {todolistsReducer} from "../../features/todolists/todolists-reducer";
import {v1} from "uuid";
import {RootStateType} from "../../app/store";
import {TaskPriorities, TaskStatuses} from "../../dal/api";



const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ],
    tasks: {
        "todolistId1": [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                order: 0, addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: ''
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                order: 0,
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: ''
            }
        ],
        "todolistId2": [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                order: 0,
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: ''
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                order: 0,
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: ''
            }
        ]
    }
};

export const storyBookstore = createStore(rootReducer, initialGlobalState as RootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookstore}>{storyFn()}</Provider>
)