import React, { useState, useCallback, useEffect } from 'react';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';
import BlockForLoopOrchestrator from './block-for-loop-ochestrator';

function BlockForLoop({
	declarations,
	lines,
	components,
	handleChange,
	valueMap,
	missing,
	shortcut,
	features,
	preferences,
	management,
	executeExpression,
	iterations,
	custom,
}) {
	const [nbRows, setNbRows] = useState(-1);
	const [min, setMin] = useState(undefined);
	const [max, setMax] = useState(undefined);

	useEffect(
		function () {
			if (lines) {
				const { min, max } = lines;
				if (min !== undefined && max !== undefined) {
					setMin(min);
					setMax(max);
				}
			}
		},
		[lines]
	);

	useEffect(
		function () {
			if (Number.parseInt(iterations)) {
				setNbRows(iterations);
			} else if (min && max) {
				setNbRows(min);
			}
		},
		[min, max, iterations]
	);

	const handleChangeLoop = useCallback(
		function (response, value, args) {
			handleChange(response, value, { ...args, loop: true, length: nbRows });
		},
		[handleChange, nbRows]
	);

	if (nbRows > 0) {
		return (
			<>
				<DeclarationsBeforeText declarations={declarations} custom={custom} />
				<DeclarationsAfterText declarations={declarations} custom={custom} />
				<BlockForLoopOrchestrator
					components={components}
					handleChange={handleChangeLoop}
					nbRows={nbRows}
					valueMap={valueMap}
					management={management}
					missing={missing}
					shortcut={shortcut}
					features={features}
					preferences={preferences}
					executeExpression={executeExpression}
					custom={custom}
				/>
				<DeclarationsDetachable declarations={declarations} custom={custom} />
			</>
		);
	}
	return null;
}

export default BlockForLoop;

// handleChange={handleChange}
// preferences={preferences}
// savingType={savingType}
// management={management}
// features={features}
// bindings={bindings}
// missing={missing}
// shortcut={shortcut}