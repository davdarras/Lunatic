export function composeFilters(...filters) {
	return filters.reduce(
		function (next, current) {
			return (tokens, args) => next(current(tokens, args), args);
		},
		(t) => t
	);
}

export default composeFilters;
