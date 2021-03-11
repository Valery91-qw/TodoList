import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle, FilterType,
    removeTodoList, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {

    const action = removeTodoList({id: todolistId1})

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const action = addTodolist({
     todolist : {
         id: newTodolistTitle,
         addedDate: '',
         order: 0,
         title: newTodolistTitle
     }})

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitle({title: newTodolistTitle, id: todolistId2})

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterType = "completed";

    const action = changeTodolistFilter({filter: newFilter, id: todolistId2})

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


