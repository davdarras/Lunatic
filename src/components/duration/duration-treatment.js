// definition for each basic format of french label and standart min/max
export const formatStandarts = {
	year: { label: 'Année(s)', min: 0, max: 999999 },
	month: { label: 'Mois', min: 0, max: 11 },
	day: { label: 'Jour(s)', min: 0, max: 30 },
	hour: { label: 'Heure(s)', min: 0, max: 23 },
	minute: { label: 'Minute(s)', min: 0, max: 59 },
	second: { label: 'Seconde(s)', min: 0, max: 59 },
};

// Filter of formatStandarts using the format string provided in props
export const splitDurationFormat = (format) => {
	const formats = {};
	if (format.includes('Y')) formats.year = formatStandarts.year;
	if (format.includes('M') && !format.includes('T'))
		formats.month = formatStandarts.month;
	if (format.includes('T') && format.split('T')[0].includes('M'))
		formats.month = formatStandarts.month;
	if (format.includes('D')) formats.day = formatStandarts.day;
	if (format.includes('H')) formats.hour = formatStandarts.hour;
	if (format.includes('T') && format.split('T')[1].includes('M'))
		formats.minute = formatStandarts.minute;
	if (format.includes('S')) formats.second = formatStandarts.second;
	return formats;
};

// Splits the given value using formats and returns an object with the number value of each format
export const splitDurationValue = (value, formats) => {
	const values = {};
	if (value === null) {
		Object.keys(formats).map((format) => (values[format] = null));
		return values;
	}
	const valueWithoutTime = value.includes('T') ? value.split('T')[0] : value;
	if (formats.year) {
		if (value.includes('Y')) {
			values.year = parseInt(value.split('P')[1].split('Y')[0], 10);
		} else values.year = null;
	}
	if (formats.month) {
		if (valueWithoutTime.includes('M')) {
			if (valueWithoutTime.includes('Y')) {
				values.month = parseInt(value.split('Y')[1].split('M')[0], 10);
			} else values.month = parseInt(value.split('P')[1].split('M')[0], 10);
		} else values.month = null;
	}
	if (formats.day) {
		if (value.includes('D')) {
			if (valueWithoutTime.includes('M')) {
				if (value.includes('Y')) {
					values.day = parseInt(value.split('M')[1].split('D')[0], 10);
				} else values.day = parseInt(value.split('Y')[1].split('D')[0], 10);
			} else values.day = parseInt(value.split('P')[1].split('D')[0], 10);
		} else values.day = null;
	}
	if (formats.hour) {
		if (value.includes('H')) {
			values.hour = parseInt(value.split('T')[1].split('H')[0], 10);
		} else values.hour = null;
	}
	if (formats.minute) {
		if (value.includes('T')) {
			if (value.includes('H')) {
				values.minute = parseInt(value.split('H')[1].split('M')[0], 10);
			} else values.minute = parseInt(value.split('T')[1].split('M')[0], 10);
		} else values.minute = null;
	}
	if (formats.second) {
		if (value.includes('S')) {
			if (value.includes('T')) {
				if (value.includes('H')) {
					values.second = parseInt(value.split('M')[1].split('S')[0], 10);
				} else values.second = parseInt(value.split('H')[1].split('S')[0], 10);
			} else values.second = parseInt(value.split('T')[1].split('S')[0], 10);
		} else values.second = null;
	}
	return values;
};

// Casts the number values to the duration format
export const durationValue = (values) => {
	if (
		(values.year && !isNaN(values.year)) ||
		(values.month && !isNaN(values.month)) ||
		(values.day && !isNaN(values.day)) ||
		(values.hour && !isNaN(values.hour)) ||
		(values.minute && !isNaN(values.minute)) ||
		(values.second && !isNaN(values.second))
	) {
		let value = 'P';
		if (values.year && !isNaN(values.year)) value += values.year + 'Y';
		if (values.month && !isNaN(values.month)) value += values.month + 'M';
		if (values.day && !isNaN(values.day)) value += values.day + 'D';
		if (
			(values.hour && !isNaN(values.hour)) ||
			(values.minute && !isNaN(values.minute)) ||
			(values.second && !isNaN(values.second))
		)
			value += 'T';
		if (values.hour && !isNaN(values.hour)) value += values.hour + 'H';
		if (values.minute && !isNaN(values.minute)) value += values.minute + 'M';
		if (values.second && !isNaN(values.second)) value += values.second + 'S';
		return value;
	} else {
		return null;
	}
};

export function minMaxDuration(min, max, splitDuration) {
	const minDuration = min
		? splitDurationValue(min, splitDuration)
		: Object.entries(splitDuration).reduce(
				(acc, [unit, { min }]) => ({ ...acc, [unit]: min }),
				{}
		  );
	const maxDuration = max
		? splitDurationValue(max, splitDuration)
		: Object.entries(splitDuration).reduce(
				(acc, [unit, { max }]) => ({ ...acc, [unit]: max }),
				{}
		  );
	return Object.entries(splitDuration).reduce(
		(acc, [unit, { min: minStandart, max: maxStandart }]) => {
			const isMinMaxStandart =
				Object.keys(acc).length > 0 &&
				Object.values(acc)[Object.values(acc).length - 1].min !==
					Object.values(acc)[Object.values(acc).length - 1].max;
			return {
				...acc,
				[unit]: isMinMaxStandart
					? { min: minStandart, max: maxStandart }
					: { min: minDuration[unit] || 0, max: maxDuration[unit] || 0 },
			};
		},
		{}
	);
}
