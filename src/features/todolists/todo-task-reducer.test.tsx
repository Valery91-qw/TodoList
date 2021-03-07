import {tasksReducer, TasksStateType} from "./todolist/task/tasks-reducer";
import {addTodolist, removeTodoList, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../dal/api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolist({
        id: "New Todolist",
        addedDate: '',
        order: 0,
        title: "New Todolist"
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                todoListId: "todolistId1",
                status: TaskStatuses.New,
                startDate: '',
                priority: TaskPriorities.Low,
                description: '',
                deadline: '',
                addedDate: '',
                order: 0
            },
            {
                id: "2",
                title: "JS",
                todoListId: "todolistId1",
                status: TaskStatuses.Completed,
                startDate: '',
                priority: TaskPriorities.Low,
                description: '',
                deadline: '',
                addedDate: '',
                order: 0
            },
            {
                id: "3",
                title: "React",
                todoListId: "todolistId1",
                status: TaskStatuses.New,
                startDate: '',
                priority: TaskPriorities.Low,
                description: '',
                deadline: '',
                addedDate: '',
                order: 0
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                todoListId: "todolistId2",
                status: TaskStatuses.New,
                startDate: '',
                priority: TaskPriorities.Low,
                description: '',
                deadline: '',
                addedDate: '',
                order: 0
            },
            {
                id: "2",
                title: "milk",
                todoListId: "todolistId2",
                status: TaskStatuses.Completed,
                startDate: '',
                priority: TaskPriorities.Low,
                description: '',
                deadline: '',
                addedDate: '',
                order: 0
            },
            {
                id: "3",
                title: "tea",
                todoListId: "todolistId2",
                status: TaskStatuses.New,
                startDate: '',
                priority: TaskPriorities.Low,
                description: '',
                deadline: '',
                addedDate: '',
                order: 0
            }
        ]
    };

    const action = removeTodoList("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
