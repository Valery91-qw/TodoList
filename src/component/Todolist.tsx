import React, {ChangeEvent, useCallback} from "react";
import {AddItemForm} from "./addItemForm/AddItemForm";
import {EditableSpan} from "./editableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type FilterType = "all" | "active" | "completed"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTodolistFilter: (filter: FilterType, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType
}

export const Todolist = React.memo( (props: TodolistPropsType) => {
    console.log("Todolist called")

    // добовление таски
    const addTask = useCallback( (title: string) => {
            props.addTask(title, props.id)
    },[props])
    const onChangeTodolistTitle = useCallback( (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }, [props] )
    // удаление тудулиста
    const removeTodolist = useCallback( () => {
        props.removeTodolist(props.id)
    } , [props] )
    // пачка колюэков на кнопки для фильтрации
    const onAllClickHandler = useCallback( () => props.changeTodolistFilter('all', props.id) ,[props] )
    const onActiveClickHandler = useCallback( () => props.changeTodolistFilter('active', props.id), [props] )
    const onCompleteClickHandler = useCallback( () => props.changeTodolistFilter('completed', props.id), [props])

    let tasksForTodo = props.tasks

    if(props.filter === 'active') {
        tasksForTodo = props.tasks.filter(task => !task.isDone)
    }
    if(props.filter === 'completed') {
        tasksForTodo = props.tasks.filter(task => task.isDone)
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
                                     isDone={task.isDone}
                                     title={task.title}
                                     todoId={props.id}
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