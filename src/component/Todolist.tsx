import React, {ChangeEvent} from "react";
import {AddItemForm} from "./addItemForm/AddItemForm";
import {EditableSpan} from "./editableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type FilterType = "all" | "active" | "completed"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeFilter: (filter: FilterType, todolistId: string) => void
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

export const Todolist = (props: TodolistPropsType) => {

    // добовление таски
    const addTask = (title: string) => {
            props.addTask(title, props.id)
    }
    const onChangeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }
    // удаление тудулиста
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    // пачка колюэков на кнопки для фильтрации
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompleteClickHandler = () => props.changeFilter('completed', props.id)

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
                    props.tasks.map(task => {
                        // колбэкфункция в самом массиве для кнопки удаления таски. Так как для каждой кнопки своя
                        const onRemoveHandler = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)
                        }
                        const onChangeTitle = (newTitle: string) => {
                            props.changeTaskTitle(task.id, newTitle, props.id)
                        }

                        return <div key={task.id} className={task.isDone ? 'is-done' : ""}>
                            <Checkbox color='primary' checked={task.isDone} onChange={onChangeHandler}/>
                            <EditableSpan value={task.title} onChange={onChangeTitle}/>
                            <IconButton color='primary' size='small' onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
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
}