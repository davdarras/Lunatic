import React, { useCallback } from 'react';
import { createCustomizableLunaticField } from '../commons';
import './duration.scss';
import {
	splitDurationFormat,
	splitDurationValue,
	durationValue,
	minMaxDuration,
} from './duration-treatment';

function Duration({
	value,
	onChange,
	disabled,
	readOnly,
	labelId,
	min,
	max,
	format,
}) {
	const splitDuration = splitDurationFormat(format);
	const values = splitDurationValue(value, splitDuration);
	const minMax = minMaxDuration(min, max, splitDuration);
	const handleChange = useCallback(
		(unit) => (event) => {
			const val = { ...values, [unit]: event.target.value };
			onChange(durationValue(val));
		},
		[onChange, values]
	);

	return (
		<div className="containerInput">
			{Object.entries(splitDuration).map((unit) => (
				<>
					<input
						className="inputDuration"
						type="number"
						onChange={handleChange(unit[0])}
						value={values[unit[0]]}
						labelledby={labelId}
						readOnly={readOnly}
						disabled={disabled}
						min={minMax[unit[0]] ? minMax[unit[0]].min : 0}
						max={minMax[unit[0]] ? minMax[unit[0]].max : 0}
					/>
					<label className="labelDuration">{unit[1].label}</label>
				</>
			))}
		</div>
	);
}

export default createCustomizableLunaticField(Duration);
