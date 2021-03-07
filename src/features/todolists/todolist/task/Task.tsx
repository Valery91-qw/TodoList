import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../component/editableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses} from "../../../../dal/api";
// Types
export type TaskPropsType = {
    id: string
    status: TaskStatuses
    title: string
    changeTaskTitle:(todolistId: string, id: string, newTitle: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    todoId: string
}

export const Task = React.memo( (props: TaskPropsType) => {

    const onRemoveHandler = useCallback( () => {
        props.removeTask(props.id, props.todoId)
    }, [props] )
    const onChangeHandler = useCallback( (event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todoId)
    } , [props] )
    const onChangeTitle = useCallback( (newTitle: string) => {
        props.changeTaskTitle(props.todoId, props.id, newTitle)
    }, [props] )
    
    return <div key={props.id} className={props.status === TaskStatuses.Completed ? 'is-done' : ""}>
        <Checkbox color='primary' checked={props.status === TaskStatuses.Completed} onChange={onChangeHandler}/>
        <EditableSpan value={props.title} onChange={onChangeTitle}/>
        <IconButton color='primary' size='small' onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
} )

