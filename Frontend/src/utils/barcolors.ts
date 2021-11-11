import * as d3 from 'd3';
import colors from '../colors.json';

export type TColor = (val: string | number) => string;
export type ColorMap = { [key: string]: TColor };

export default function barcolorsFactory(): { [data: string]: ColorMap } {
	// const alldims = Object.keys(metadata);
	// const colors: { [key: string]: TColor } = {};

	// for (const dim of alldims) {
	// 	// @ts-ignore
	// 	const groupByDim = [...d3.group(dataset, (d) => d[dim])].sort(function sortByCount(a, b) {
	// 		const countA = a.values.length;
	// 		const countB = b.values.length;
	// 		return countB - countA;
	// 	});

	// 	const possibleValues = groupByDim.map(([dim]) => dim);

	// 	if (isNaN(+possibleValues[0])) {
	// 		// Nominal
	// 		const color = {};
	// 		for (let i = 0; i < possibleValues.length; i++) {
	// 			// @ts-ignore
	// 			color[possibleValues[i]] = d3.schemeTableau10[i];
	// 		}
	// 		colors[dim] = (val: string | number) => (val === 'others' ? 'gainsboro' : color[val]);
	// 	} else {
	// 		// Ordinal
	// 		const vals = possibleValues.map((d) => +d);

	// 	}
	// }
	// return colors;
	const res = { book: {}, rent: {}, patron: {} };
	for (const [data, dims] of Object.entries(colors)) {
		for (const [dim, val] of Object.entries(dims)) {
			if (!val.length) {
				res[data][dim] = (d: string | number) => {
					const color = d in val ? val[d] : 'gainsboro';
					return color;
				};
			} else {
				res[data][dim] = (d: string | number) => {
					const scale = d3.scaleLinear().domain(val).range([0, 1]);

					return d3.interpolateBlues(scale(<number>d));
				};
			}
		}
	}
	return res;
}
