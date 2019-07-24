import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import './checkbox.scss';

const CheckboxOne = ({
	id,
	label,
	preferences,
	response,
	options,
	handleChange,
	positioning,
	disabled,
	keyboardSelection,
	focused,
	declarations,
	tooltip,
	style,
}) => {
	const inputRef = useRef();

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

	const { fieldsetStyle, checkboxStyle } = style;

	return (
		<React.Fragment>
			<Declarations
				id={id}
				type={U.BEFORE_QUESTION_TEXT}
				declarations={declarations}
			/>
			<div className="field-container">
				<div className={`${tooltip ? 'field-with-tooltip' : 'field'}`}>
					<fieldset
						key={`checkbox-one-${id}`}
						className="checkbox-group"
						style={U.buildStyleObject(fieldsetStyle)}
					>
						<legend>{label}</legend>
						<Declarations
							id={id}
							type={U.AFTER_QUESTION_TEXT}
							declarations={declarations}
						/>
						{options.map(({ label: optionLabel, value: optionValue }, i) => {
							const checked =
								U.getResponseByPreference(preferences)(response) ===
								optionValue;
							return (
								<div
									key={`checkbox-one-${id}-${optionValue}`}
									className={`checkbox-modality ${U.getItemsPositioningClass(
										positioning
									)}`}
								>
									<input
										type="checkbox"
										id={`checkbox-one-${id}-${optionValue}`}
										ref={inputRef}
										key={`checkbox-one-${id}-${optionValue}`}
										aria-labelledby={`input-label-${id}-${optionValue}`}
										className="checkbox-lunatic"
										checked={checked}
										disabled={disabled}
										onChange={() =>
											handleChange({
												[U.getResponseName(response)]: optionValue,
											})
										}
									/>
									<label
										htmlFor={`checkbox-one-${id}-${optionValue}`}
										id={`input-label-${id}-${optionValue}`}
										style={checked ? U.buildStyleObject(checkboxStyle) : {}}
									>
										{keyboardSelection
											? `${U.getAlphabet()[i].toUpperCase()} - ${optionLabel}`
											: optionLabel}
									</label>
								</div>
							);
						})}
					</fieldset>
				</div>
				{tooltip && (
					<div className="tooltip">
						<TooltipResponse id={id} response={response} />
					</div>
				)}
			</div>
			<Declarations id={id} type={U.DETACHABLE} declarations={declarations} />
		</React.Fragment>
	);
};

CheckboxOne.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	response: {},
	disabled: false,
	focused: false,
	keyboardSelection: false,
	positioning: 'DEFAULT',
	declarations: [],
	tooltip: false,
	style: { fieldsetStyle: {}, checkboxStyle: {} },
};

CheckboxOne.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	options: U.optionsPropTypes,
	handleChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	focused: PropTypes.bool,
	keyboardSelection: PropTypes.bool,
	positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
	declarations: U.declarationsPropTypes,
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default CheckboxOne;