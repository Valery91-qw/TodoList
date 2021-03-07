import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import { IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo( (props: AddItemFormType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (event.code === "Enter") {
            addItem()
        }
    }
    return (<div>
        <TextField size='small'
                   disabled={props.disabled}
                   value={title}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeHandler}
                   error={!!error}
                   label='Title'
                   helperText={error}
        />
        <IconButton color='primary' onClick={addItem} disabled={props.disabled}>
            <AddBox />
        </IconButton>
    </div>)
} )