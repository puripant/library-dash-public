import * as d3 from 'd3';

import { TDataCB } from '../types';

const formatAndFilter: TDataCB = (data, xDim, stackDim, filter) => {
	const dataByBaseDim = d3.group(
		data,
		(d) => d[xDim],
		(d) => d[stackDim]
	);
	const res = Array.from(dataByBaseDim.entries()).map(([x, y]) => ({
		x,
		y: Array.from(y.entries()).map(([z, w]) => ({
			x2: z,
			y2: filter ? w.filter((v) => v[filter.dim] === filter.value).length : w.length
		}))
	}));
	return res;
};

export default formatAndFilter;
