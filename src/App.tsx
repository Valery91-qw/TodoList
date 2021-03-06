import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./component/Todolist";
import {AddItemForm} from "./component/addItemForm/AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, Grid, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./Bll/store";
import {createTask, deleteTask, updateTask} from "./Bll/tasks-reducer";
import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle, createTodolist, deleteTodolis, fetchTodolists,
    FilterType,
    removeTodoList,
    TodolistDomainType, updateTodolis
} from "./Bll/todolists-reducer";
import { TaskStatuses, TaskType} from "./Dal/api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {



    const todoLists = useSelector<RootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolists())
    }, [dispatch])

    // добовление таски
    const addTaskCallback = useCallback( ( title: string,todolistId: string) => {
       dispatch(createTask(todolistId, title))
    }, [dispatch])

    // фильтрация тасок
    const changeTaskStatusCallback = useCallback( (id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTask(todolistId, id, {status}))
    }, [dispatch] )

    // изменение заголовка таски
    const changeTaskTitleCallback = useCallback( ( todolistId: string, id: string, newTitle: string,) => {
        dispatch(updateTask(todolistId,  id , {title: newTitle}))
    }, [dispatch] )

    // удаление тасок
    const removeTaskCallback = useCallback( (todolistId: string, id: string) => {
        dispatch(deleteTask(todolistId, id))
    },[dispatch] )

    const removeTodolistCallback = useCallback( (id: string) => {
        dispatch(deleteTodolis(id))
    }, [dispatch])

    const changeTodolistFilterCallback = useCallback( (filter: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilter(filter, todolistId))
    }, [dispatch])

    const changeTodolistTitleCallback = useCallback ((newTitle: string, todolistId: string) => {
        dispatch(updateTodolis(todolistId, newTitle))
    },[dispatch])

    const addTodolistCallback = useCallback( (title: string) => {
        dispatch(createTodolist(title))
    },[dispatch] )


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
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
                </Grid>
            </Container>
        </div>
    );
}

export default App;
