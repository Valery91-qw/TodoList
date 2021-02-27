import {ChangeEvent, useState, KeyboardEvent} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {

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
        setError(null);
        if (event.code === "Enter") {
            addItem()
        }
    }
    return (<div>
        <TextField size='small'
                   value={title}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeHandler}
                   error={!!error}
                   label='Title'
                   helperText={error}
        />
        <IconButton color='primary' onClick={addItem}>
            <AddBox />
        </IconButton>
    </div>)
}