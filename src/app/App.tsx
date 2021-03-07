import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, LinearProgress} from "@material-ui/core";
import {TodolistsList} from "../features/todolists/TodolistsList";
import {useSelector} from "react-redux";
import {RootStateType} from "./store";
import {RequestStatusType} from "./App-reducer";
import {ErrorSnackbar} from "../component/errorSnackbar/ErrorSnackbar";


function App() {

    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar />
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
                {status === 'loading' && <LinearProgress color="secondary" />}
            </AppBar>
            <Container fixed>
               <TodolistsList />
            </Container>
        </div>
    );
}


export default App;
