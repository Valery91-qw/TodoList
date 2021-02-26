import {ChangeEvent, useState, KeyboardEvent} from "react";

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
        <input value={title}
               className={error ? 'error' : ''}
               onKeyPress={onKeyPressHandler}
               onChange={onChangeHandler}
        />
        <button onClick={addItem}>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>)
}