import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo( (props: EditableSpanPropsType) => {

   const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const onChange = useCallback( (event: ChangeEvent<HTMLInputElement>) => {
       setTitle(event.currentTarget.value)
    } , [])

    const editModeHandler = useCallback( () => {
       setEditMode(!editMode)
        props.onChange(title)
    }, [editMode, props, title] )

    return (editMode
        ? <TextField size='small' onChange={onChange} value={title} autoFocus onBlur={editModeHandler} />
        : <span onDoubleClick={editModeHandler}>{title}</span>
    )
} )