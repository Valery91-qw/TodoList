import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";


export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
} as Meta;



const Template: Story<EditableSpanPropsType> = (args ) => <EditableSpan {...args} />;



export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    value: 'Value',
    onChange: action('Value changed')
};
