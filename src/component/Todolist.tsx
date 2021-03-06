import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./addItemForm/AddItemForm";
import {EditableSpan} from "./editableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {FilterType} from "../Bll/todolists-reducer";
import {TaskStatuses, TaskType} from "../Dal/api";
import {useDispatch} from "react-redux";
import {fetchTasks} from "../Bll/tasks-reducer";


export type TodolistPropsType = {
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTodolistFilter: (filter: FilterType, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    todoId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType
}

export const Todolist = React.memo( (props: TodolistPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks(props.todoId))
    }, [dispatch, props.todoId])

    // добовление таски
    const addTask = useCallback( (title: string) => {
            props.addTask(title, props.todoId)
    },[props])
    const onChangeTodolistTitle = useCallback( (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todoId)
    }, [props] )
    // удаление тудулиста
    const removeTodolist = useCallback( () => {
        props.removeTodolist(props.todoId)
    } , [props] )   // пачка колюэков на кнопки для фильтрации
    const onAllClickHandler = useCallback( () => props.changeTodolistFilter('all', props.todoId) ,[props] )
    const onActiveClickHandler = useCallback( () => props.changeTodolistFilter('active', props.todoId), [props] )
    const onCompleteClickHandler = useCallback( () => props.changeTodolistFilter('completed', props.todoId), [props])

    let tasksForTodo = props.tasks

    if(props.filter === 'active') {
        tasksForTodo = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if(props.filter === 'completed') {
        tasksForTodo = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
            <EditableSpan value={props.title} onChange={onChangeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
             <Delete/>
            </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTask} />
            </div>
            <div>
                {
                    tasksForTodo.map(task => {
                        return <Task key={task.id}
                                     id={task.id}
                                     status={task.status}
                                     title={task.title}
                                     todoId={props.todoId}
                                     changeTaskStatus={props.changeTaskStatus}
                                     removeTask={props.removeTask}
                                     changeTaskTitle={props.changeTaskTitle}/>
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} color='default'
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "text"} color='primary'
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"} color='secondary'
                        onClick={onCompleteClickHandler}>Completed</Button>
            </div>
        </div>
    )
} )