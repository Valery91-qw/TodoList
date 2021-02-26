import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddItemForm} from "./addItemForm/AddItemForm";
import {EditableSpan} from "./editableSpan/EditableSpan";

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

    // const [error, setError] = useState<string | null>(null)
    //
    // const [title, setTitle] = useState("")
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
            <button onClick={removeTodolist}>X</button>
            </h3>
            <div>
                <AddItemForm addItem={addTask} />
            </div>
            <ul>
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

                        return <li key={task.id} className={task.isDone ? 'is-done' : ""}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <EditableSpan value={task.title} onChange={onChangeTitle}/>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompleteClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}