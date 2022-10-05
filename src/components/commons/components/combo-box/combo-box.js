import React, { useCallback, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ComboBoxContent from './combo-box-content';
import Selection from './selection';
import Panel from './panel';
import Delete from './selection/delete';
import ComboBoxContainer from './combo-box-container';
import createCustomizableLunaticField from '../../create-customizable-field';
import { INITIAL_STATE, reducer, actions } from './state-management';
import './combo-box.scss';

const EMPTY_SEARCH = '';

function getDefaultOptionValue(option = {}) {
	const { id, value } = option;
	return id || value;
}

function ComboBox({
	className,
	classStyle,
	placeholder,
	labelledBy,
	htmlFor,
	editable,
	disabled,
	id,
	optionRenderer,
	labelRenderer,
	onChange,
	onSelect,
	value,
	options,
	messageError,
	search: searchProps,
	getOptionValue,
}) {
	const [state, dispatch] = useReducer(reducer, {
		...INITIAL_STATE,
		search: searchProps,
	});
	const { focused, expended, search, selectedIndex, displayLabel } = state;

	useEffect(
		function () {
			dispatch(
				actions.onInit({ options, value, selectedIndex, getOptionValue })
			);
		},
		[options, value, selectedIndex, getOptionValue]
	);

	const onFocus = useCallback(function () {
		dispatch(actions.onFocus());
	}, []);

	const onBlur = useCallback(function () {
		dispatch(actions.onBlur());
	}, []);

	const handleSelect = useCallback(
		function (index) {
			const option = options[index];
			dispatch(actions.onSelect(index));
			onSelect(getOptionValue(option));
		},
		[options, onSelect, getOptionValue]
	);

	const handleChange = useCallback(
		function (s) {
			dispatch(actions.onChange(s));
			onChange(s);
		},
		[onChange]
	);

	const onKeyDown = useCallback(
		function (key) {
			const { length } = options;
			dispatch(actions.onKeydown(key, length));
		},
		[options]
	);

	const onDelete = useCallback(
		function () {
			dispatch(actions.onDelete());
			onChange(EMPTY_SEARCH);
		},
		[onChange]
	);

	if (messageError) {
		return (
			<div className="lunatic-combo-box-message-error">{messageError}</div>
		);
	}

	return (
		<ComboBoxContainer id={id} classStyle={classStyle} className={className}>
			<ComboBoxContent
				id={id}
				focused={focused}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			>
				<Selection
					labelRenderer={labelRenderer}
					placeholder={placeholder}
					labelledBy={labelledBy}
					htmlFor={htmlFor}
					search={search}
					expended={expended}
					id={id}
					disabled={disabled}
					focused={focused}
					editable={editable}
					selectedIndex={selectedIndex}
					options={options}
					onChange={handleChange}
					displayLabel={displayLabel}
				/>
				<Panel
					optionRenderer={optionRenderer}
					value={value}
					options={options}
					focused={focused}
					selectedIndex={selectedIndex}
					expended={expended}
					id={id}
					search={search}
					onSelect={handleSelect}
				/>
			</ComboBoxContent>
			<Delete
				className={classnames({ focused })}
				search={search}
				onClick={onDelete}
				editable={editable}
			/>
		</ComboBoxContainer>
	);
}

ComboBox.propTypes = {
	classStyle: PropTypes.string,
	placeholder: PropTypes.string,
	htmlFor: PropTypes.string.isRequired,
	labelledBy: PropTypes.string.isRequired,
	search: PropTypes.string,
	editable: PropTypes.bool,
	onSelect: PropTypes.func,
	onChange: PropTypes.func,
	options: PropTypes.array,

	className: PropTypes.string,
	disabled: PropTypes.bool,
	id: PropTypes.string.isRequired,
	optionRenderer: PropTypes.elementType.isRequired,
	labelRenderer: PropTypes.elementType.isRequired,
	getOptionValue: PropTypes.func,
	// value: PropTypes.oneOf([
	// 	null,
	// 	PropTypes.oneOfType([
	// 		PropTypes.string,
	// 		PropTypes.number,
	// 		PropTypes.array,
	// 		PropTypes.bool,
	// 	]),
	// ]).isRequired,
};

ComboBox.defaultProps = {
	classStyle: 'default-style',
	placeholder: 'Please, do something...',
	editable: false,
	search: EMPTY_SEARCH,
	onSelect: () => null,
	onChange: () => null,
	options: [],
	getOptionValue: getDefaultOptionValue,
};

export default createCustomizableLunaticField(ComboBox);