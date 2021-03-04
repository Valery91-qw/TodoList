import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import { Task } from "./Task";
import {Todolist, TodolistPropsType} from "./Todolist";


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
    id: "todolistId",
    tasks: [{id: "1", isDone: true, title: "Redux"},
            {id: "1", isDone: false, title: "React"}
    ]

};
