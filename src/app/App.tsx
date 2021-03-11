import React, {useCallback, useEffect} from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {CircularProgress, Container, LinearProgress} from "@material-ui/core";
import {TodolistsList} from "../features/todolists/TodolistsList";
import { useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./store";
import {initializeApp, RequestStatusType} from "./App-reducer";
import {ErrorSnackbar} from "../component/errorSnackbar/ErrorSnackbar";
import {Route, Switch, Redirect, HashRouter} from 'react-router-dom';
import {Login} from "../features/login/Login";
import {logout} from "../features/login/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<RootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <HashRouter>
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button style={{marginLeft : 'auto'}} color="inherit" onClick={logoutHandler}>log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route exact path={'/login'} render={() => <Login/>}/>
                    <Route exact path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
        </HashRouter>
    );
}


export default App;
