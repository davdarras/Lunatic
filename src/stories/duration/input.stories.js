import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './component_duration.json';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/Duration',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'duration', source };
