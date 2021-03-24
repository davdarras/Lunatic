import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import * as R from './with-roster';
import * as B from './with-loop';
import { positioningOptions } from '../utils/options';
import { select } from '@storybook/addon-knobs/react';

const storiesR = storiesOf('Loop/With roster', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Loop" />;
	});

storiesR.addWithJSX('Default Loop', () => (
	<Orchestrator
		id="default-loop"
		source={R.dataLoopWithRoster}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

storiesR.addWithJSX('Deeper Loop', () => (
	<Orchestrator
		id="double-loop"
		source={R.dataLoopDeeperWithRoster}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

storiesR.addWithJSX('VQS', () => (
	<Orchestrator
		id="vqs"
		source={R.dataVQSWithRoster}
		data={{ EXTERNAL: { NOMCONTACT: 'Bart', ADRESSE: 'Adresse de Bart' } }}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

const storiesB = storiesOf('Loop/With loop', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Loop" />;
	});

storiesB.addWithJSX('Default Loop', () => (
	<Orchestrator
		id="default-loop"
		source={B.dataLoopWithLoop}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

storiesB.addWithJSX('Deeper Loop', () => (
	<Orchestrator
		id="double-loop"
		source={B.dataLoopDeeperWithLoop}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

storiesB.addWithJSX('VQS', () => (
	<Orchestrator
		id="vqs"
		source={B.dataVQSWithLoop}
		data={{ EXTERNAL: { NOMCONTACT: 'Bart', ADRESSE: 'Adresse de Bart' } }}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));