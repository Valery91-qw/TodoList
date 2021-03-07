import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import {TaskStatuses} from "../../../../dal/api";


export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta;

const removeCallback = action('Remove button inside task clicked')
const changeStatusCallback = action('Status changed inside task')
const changeTitleCallback = action('Issue title changed')

const Template: Story<TaskPropsType> = (args ) => <Task {...args} />;

const baseArg = {
    removeTask: removeCallback,
    changeTaskStatus: changeStatusCallback,
    changeTaskTitle: changeTitleCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
   ...baseArg,
    title: 'React',
    status: TaskStatuses.Completed,
    id: '2',
    todoId: 'todolistId1'
};

export const TaskNotDoneExample = Template.bind({});
TaskNotDoneExample.args = {
    ...baseArg,
    title: 'Lazy',
    status: TaskStatuses.New,
    id: '1',
    todoId: 'todolistId1'
};