import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navbar from '.';

export default {
  title: 'Gettem/Navbar',
  component: Navbar, 
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button', 
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
