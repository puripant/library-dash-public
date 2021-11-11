import * as d3 from 'd3';

import type { TData, TDataCB, TFilter } from '../types';

// @ts-ignore
const formatAndFilter: TDataCB = async (data, xDim, stackDim, filter = []) => {
	const res = await fetch(`http://127.0.0.1:5001/v1/filter`, {
		method: 'POST',
		body: JSON.stringify({
			basedim: data,
			xDim,
			stackDim,
			filter
		})
		// mode: 'no-cors'
	});
	const json = await res.json();
	return json;
};

function filterAndCount(array: TData[], filters: TFilter[]): number {
	for (const filter of filters) {
		array = array.filter((v) => v[filter.dim] === filter.value);
	}

	return array.length;
}

export default formatAndFilter;
