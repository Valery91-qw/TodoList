import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {FilterType, TaskType, Todolist} from "./component/Todolist";
import {AddItemForm} from "./component/addItemForm/AddItemForm";


type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "HardWork", filter: "all"},
        {id: todolistId2, title: "MoreWork", filter: "active"}
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "MoreWorks", isDone: true},
            {id: v1(), title: "MoreWorks", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "MoreWorks", isDone: false},
            {id: v1(), title: "MoreWorks", isDone: true},
        ]
    })

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title, isDone: true}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    // фильтрация тасок
    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeTaskTitle = (newTitle: string, id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    // удаление тасок сетает таски в стейт но только те что прошли проверку
    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    function removeTodolist(id: string) {
        setTodoLists(todoLists.filter(todolist => todolist.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const changeFilter = (filter: FilterType, todolistId: string) => {
        let todoList = todoLists.find(todolist => todolist.id === todolistId)
        if (todoList) {
            todoList.filter = filter
            setTodoLists([...todoLists])
        }
    }
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        let todoList = todoLists.find(todolist => todolist.id === todolistId)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }


    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        setTodoLists([newTodolist, ...todoLists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {
                todoLists.map(todolist => {
                    // создается переменная которой присвивается весь исходный массив
                    // и потом передается в компоненту отфильтрованный массив
                    let allTodolistTasks = tasks[todolist.id]
                    let tasksForTodolist = allTodolistTasks
                    // если значение в стете фильтра "active" то фильтрует массив тасок и возвращает новый массив
                    if (todolist.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                    }
                    if (todolist.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                    }
                    return <Todolist title={todolist.title}
                                     key={todolist.id}
                                     id={todolist.id}
                                     removeTask={removeTask}
                                     tasks={tasksForTodolist}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTodolistTitle={changeTodolistTitle}
                                     removeTodolist={removeTodolist}
                                     changeTaskTitle={changeTaskTitle}
                                     filter={todolist.filter}
                                     changeTaskStatus={changeTaskStatus}/>
                })
            }

        </div>
    );
}

export default App;
