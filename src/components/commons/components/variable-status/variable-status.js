import './variable-status.scss';

import * as img from './img';

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const VariableStatus = ({ id = '', children }) => {
	const [tooltipElements, setTooltipElements] = useState(() => ({
		imgName: 'editedImg',
		content: [{ key: 'TODO', value: ' coming soon' }],
	}));

	// useEffect(() => {
	// 	setTooltipElements({ imgName: 'edited', content: 'titi' });
	// }, [response]);

	const { content, imgName } = tooltipElements;

	if (!content) return null;

	const text = content
		.map(({ key, value }) => `${key} : ${value}<br />`)
		.join('');

	return (
		<div className="lunatic-component-container-test">
			<div className="lunatic-component-body">{children}</div>
			<div className="tooltip-lunatic">
				<span
					data-for={`${id}-management-tooltip`}
					data-tip={text}
					data-multiline
				>
					<img id={id} alt="img-tooltip" src={img[imgName]} />
				</span>
				<ReactTooltip
					id={`${id}-management-tooltip`}
					className="tooltip-text"
					place="left"
				/>
			</div>
		</div>
	);
};

VariableStatus.defaultProps = {
	response: {},
};

VariableStatus.propTypes = {
	id: PropTypes.string,
};

export default VariableStatus;