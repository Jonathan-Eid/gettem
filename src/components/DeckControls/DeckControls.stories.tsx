import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DeckControls from '.';

export default {
  title: 'Gettem/DeckControls',
  component: DeckControls, 
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DeckControls>;

const Template: ComponentStory<typeof DeckControls> = (args) => <DeckControls {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
