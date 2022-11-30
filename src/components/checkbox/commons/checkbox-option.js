import React, { useCallback } from 'react';
import classnames from 'classnames';
import './checkbox-option.scss';
import { createCustomizableLunaticField } from '../../commons';

function CheckboxOption({
	disabled,
	checked,
	id,
	value = false,
	onClick,
	labelledBy,
	label,
}) {
	const onClickOption = useCallback(
		function () {
			onClick(!value);
		},
		[value, onClick]
	);

	const handleKeyDown = useCallback(
		function (e) {
			const { code } = e;
			if (code === 'Space') {
				onClickOption();
			}
		},
		[onClickOption]
	);

	return (
		<div className="lunatic-checkbox-group">
			<input
				type="checkbox"
				id={id}
				name="checkbox"
				disabled={disabled}
				//className="lunatic-input-checkbox"
				aria-checked={checked}
				aria-labelledby={labelledBy}
				onClick={onClickOption}
				onKeyDown={handleKeyDown}
			/>
			<label for={id}>{label}</label>
		</div>
	);
}

export default createCustomizableLunaticField(CheckboxOption, 'CheckboxOption');
