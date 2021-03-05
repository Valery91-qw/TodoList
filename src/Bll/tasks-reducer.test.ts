import {addTask, changeTaskStatus, changeTaskTitle, removeTask, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses} from "../Dal/api";

let startState: TasksStateType = {}

beforeEach(() => {

    startState = {
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

})


test('correct task should be deleted from correct array', () => {

    const action = removeTask("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
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
    });

});
test('correct task should be added to correct array', () => {

    const action = addTask("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})
test('status of specified task should be changed', () => {

    const action = changeTaskStatus(TaskStatuses.New, "todolistId2", "2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});
test('title of specified task should be changed', () => {

    const newTitle = "Some"

    const action = changeTaskTitle(newTitle, "todolistId2", "2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe(newTitle);
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

