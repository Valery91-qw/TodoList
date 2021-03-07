import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../component/addItemForm/AddItemForm";
import {EditableSpan} from "../../../component/editableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./task/Task";
import {FilterType, TodolistDomainType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../dal/api";
import {useDispatch} from "react-redux";
import {fetchTasks} from "./task/tasks-reducer";


export type TodolistPropsType = {
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTodolistFilter: (filter: FilterType, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    tasks: Array<TaskType>
    todolist: TodolistDomainType
    demo?: boolean
}

export const Todolist = React.memo( ({demo = false, ...props}: TodolistPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks(props.todolist.id))
    }, [dispatch, props.todolist.id])

    // добовление таски
    const addTask = useCallback( (title: string) => {
            props.addTask(title, props.todolist.id)
    },[props])
    const onChangeTodolistTitle = useCallback( (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolist.id)
    }, [props] )
    // удаление тудулиста
    const removeTodolist = useCallback( () => {
        props.removeTodolist(props.todolist.id)
    } , [props] )   // пачка колюэков на кнопки для фильтрации
    const onAllClickHandler = useCallback( () => props.changeTodolistFilter('all', props.todolist.id) ,[props] )
    const onActiveClickHandler = useCallback( () => props.changeTodolistFilter('active', props.todolist.id), [props] )
    const onCompleteClickHandler = useCallback( () => props.changeTodolistFilter('completed', props.todolist.id), [props])

    let tasksForTodo = props.tasks

    if(props.todolist.filter === 'active') {
        tasksForTodo = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if(props.todolist.filter === 'completed') {
        tasksForTodo = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
            <EditableSpan value={props.todolist.title} onChange={onChangeTodolistTitle}/>
            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
             <Delete/>
            </IconButton>
            </h3>
                <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                {
                    tasksForTodo.map(task => {
                        return <Task key={task.id}
                                     entityStatus={props.todolist.entityStatus}
                                     id={task.id}
                                     status={task.status}
                                     title={task.title}
                                     todoId={props.todolist.id}
                                     changeTaskStatus={props.changeTaskStatus}
                                     removeTask={props.removeTask}
                                     changeTaskTitle={props.changeTaskTitle}/>
                    })
                }
            </div>
            <div>
                <Button variant={props.todolist.filter === "all" ? "contained" : "text"} color='default'
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={props.todolist.filter === "active" ? "contained" : "text"} color='primary'
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.todolist.filter === "completed" ? "contained" : "text"} color='secondary'
                        onClick={onCompleteClickHandler}>Completed</Button>
            </div>
        </div>
    )
} )