import {TaskStatuses} from "../../dal/api";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../app/store";
import {
    changeTodolistFilter, createTodolist,
    deleteTodolis,
    fetchTodolists,
    FilterType,
    TodolistDomainType, updateTodolis
} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {createTask, deleteTask, TasksStateType, updateTask} from "./todolist/task/tasks-reducer";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../component/addItemForm/AddItemForm";
import {Todolist} from "./todolist/Todolist";

export const TodolistsList = () => {

    const todoLists = useSelector<RootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolists())
    }, [dispatch])

    // добовление task
    const addTaskCallback = useCallback( ( title: string,todolistId: string) => {
        dispatch(createTask(todolistId, title))
    }, [dispatch])

    // изменение фильтра task
    const changeTaskStatusCallback = useCallback( (id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTask(todolistId, id, {status}))
    }, [dispatch] )

    // изменение заголовка task
    const changeTaskTitleCallback = useCallback( ( todolistId: string, id: string, newTitle: string,) => {
        dispatch(updateTask(todolistId,  id , {title: newTitle}))
    }, [dispatch] )

    // удаление task
    const removeTaskCallback = useCallback( (todolistId: string, id: string) => {
        dispatch(deleteTask(todolistId, id))
    },[dispatch] )
    // удаление todolist
    const removeTodolistCallback = useCallback( (id: string) => {
        dispatch(deleteTodolis(id))
    }, [dispatch])
    // изменение отоброжающихся тасок в todolist
    const changeTodolistFilterCallback = useCallback( (filter: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilter(filter, todolistId))
    }, [dispatch])
    // изменение заголовка todolist
    const changeTodolistTitleCallback = useCallback ((newTitle: string, todolistId: string) => {
        dispatch(updateTodolis(todolistId, newTitle))
    },[dispatch])
    // добовление todolist
    const addTodolistCallback = useCallback( (title: string) => {
        dispatch(createTodolist(title))
    },[dispatch] )

    return <><Grid container style={{padding: "20px"}}>
        <AddItemForm addItem={addTodolistCallback}/>
    </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map(todolist => {

                    let allTodolistTasks = tasks[todolist.id]

                    return <Grid item key={todolist.id}>
                        <Paper  style={{padding: "10px"}}>
                            <Todolist title={todolist.title}
                                      key={todolist.id}
                                      todoId={todolist.id}
                                      removeTask={removeTaskCallback}
                                      tasks={allTodolistTasks}
                                      changeTodolistFilter={changeTodolistFilterCallback}
                                      addTask={addTaskCallback}
                                      changeTodolistTitle={changeTodolistTitleCallback}
                                      removeTodolist={removeTodolistCallback}
                                      changeTaskTitle={changeTaskTitleCallback}
                                      filter={todolist.filter}
                                      changeTaskStatus={changeTaskStatusCallback}/>
                        </Paper>
                    </Grid>
                })
            }
        </Grid></>
}