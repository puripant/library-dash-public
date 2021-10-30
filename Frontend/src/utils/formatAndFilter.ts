import * as d3 from 'd3';

import type { TData, TDataCB, TFilter } from '../types';

// @ts-ignore
const formatAndFilter: TDataCB = async (data, xDim, stackDim, filter = []) => {
	const dataByBaseDim = d3.group(
		// @ts-ignore
		data,
		(d) => d[xDim],
		(d) => d[stackDim]
	);
	const res = Array.from(dataByBaseDim.entries())
		.map(([x, y]) => ({
			x,
			y: Array.from(y.entries()).map(([z, w]) => ({
				x2: z,
				// @ts-ignore
				y2: filter.length ? filterAndCount(w, filter) : w.length
			}))
		}))
		.sort(function sortByCount(a, b) {
			const countA = a.y.reduce((c, d) => (c += d.y2), 0);
			const countB = b.y.reduce((c, d) => (c += d.y2), 0);
			return countB - countA;
		});

	return res;
};

function filterAndCount(array: TData[], filters: TFilter[]): number {
	for (const filter of filters) {
		array = array.filter((v) => v[filter.dim] === filter.value);
	}

	return array.length;
}

export default formatAndFilter;
