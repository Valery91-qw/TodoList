import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../../../dal/api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.createTodolist('AXIOS_ROOOL')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '3fd67314-0633-4362-9ce2-414c50640149'
       todolistAPI.deleteTodolist(todoId)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = 'afab30d2-d79b-4d92-a98d-f3fcde8e3992'
        todolistAPI.updateTodolist(todoId, 'REDUX++++++++')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
