import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import {Todolist, TodolistPropsType} from "./Todolist";
import {TaskPriorities, TaskStatuses} from "../../../dal/api";


export default {
    title: 'Todolist/Todolist',
    component: Todolist,
} as Meta;

const removeCallback = action('Remove button inside todolist clicked')
const changeStatusCallback = action('change the selection of displayed items')
const changeTitleCallback = action('Sheet title changed')
const addTaskCallback = action("Task should be added")
const removeTaskCallback = action('Remove button inside task clicked')
const changeTaskStatusCallback = action('Status changed inside task')
const changeTaskTitleCallback = action('Issue title changed')


const Template: Story<TodolistPropsType> = (args ) => <Todolist {...args} />;

const baseArg = {
    removeTodolist: removeCallback,
    changeTodolistFilter: changeStatusCallback,
    changeTodolistTitle: changeTitleCallback,
    addTask: addTaskCallback,
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback
}

export const TodolistExample = Template.bind({});
TodolistExample.args = {
    ...baseArg,
    title: "myTodo",
    todoId: "todolistId",
    tasks: [{
        id: "1",
        status: TaskStatuses.New,
        title: "Redux",
        todoListId: "todolistId",
        order: 0, addedDate: '',
        deadline: '', description: '',
        priority: TaskPriorities.Low,
        startDate: ''
    },
        {
            id: "1",
            status: TaskStatuses.Completed,
            title: "React",
            todoListId: "todolistId",
            order: 0, addedDate: '',
            deadline: '', description: '',
            priority: TaskPriorities.Low,
            startDate: ''
        }
    ]

};
