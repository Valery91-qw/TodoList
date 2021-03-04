import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./editableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";

export type TaskPropsType = {
    id: string
    isDone: boolean
    title: string
    changeTaskTitle:(id: string, newTitle: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    todoId: string
}


export const Task = React.memo( (props: TaskPropsType) => {

    const onRemoveHandler = useCallback( () => {
        props.removeTask(props.id, props.todoId)
    }, [props] )
    const onChangeHandler = useCallback( (event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.id, event.currentTarget.checked, props.todoId)
    } , [props] )
    const onChangeTitle = useCallback( (newTitle: string) => {
        props.changeTaskTitle(props.id, newTitle, props.todoId)
    }, [props] )
    
    return <div key={props.id} className={props.isDone ? 'is-done' : ""}>
        <Checkbox color='primary' checked={props.isDone} onChange={onChangeHandler}/>
        <EditableSpan value={props.title} onChange={onChangeTitle}/>
        <IconButton color='primary' size='small' onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
} )
