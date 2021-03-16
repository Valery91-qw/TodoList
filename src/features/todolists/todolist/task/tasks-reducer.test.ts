import {createTask, deleteTask, fetchTasks, tasksReducer, TasksStateType, updateTask} from './tasks-reducer';
import {TaskPriorities, TaskStatuses} from "../../../../dal/api";

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

    let param = {todoId: "todolistId2", taskId: "2"};

    const action = deleteTask.fulfilled(param, 'requestId' , param);

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
    const param = {
        task: {
            description: '',
            title: 'juce',
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            id: '1',
            todoListId: "todolistId2",
            order: 0,
            addedDate: ''
        }
    }
    const action = createTask.fulfilled(param , "resolveId", {title: param.task.title, todoId: param.task.todoListId});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})
test('status of specified task should be changed', () => {

    const updateModal = {todoId: "todolistId2", taskId: "2",  domainModel: {status: TaskStatuses.New}}

    const action = updateTask.fulfilled(updateModal, 'requestId', updateModal);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});
test('title of specified task should be changed', () => {

    const newTitle = "Some"

    const updateModel ={todoId: "todolistId2",taskId: "2", domainModel: {title: newTitle}}

    const action = updateTask.fulfilled(updateModel, "requestId", updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe(newTitle);
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});
test('tasks should be added for todolist', () => {

    const action = fetchTasks.fulfilled({tasks: startState["todolistId1"], todoId: "todolistId1"}, 'requestId' , "todolistId1")

    const endState = tasksReducer({
        "todolistId1": [],
        "todolistId2": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
})



