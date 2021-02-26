import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

   const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
       setTitle(event.currentTarget.value)
    }

    const editModeHandler = () => {
       setEditMode(!editMode)
        props.onChange(title)
    }

    return (editMode
        ? <input onChange={onChange} value={title} autoFocus onBlur={editModeHandler} />
        : <span onDoubleClick={editModeHandler}>{title}</span>
    )
}