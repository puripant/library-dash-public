import * as d3 from 'd3';
import colors from '../colors.json';

export interface TColor {
	(val: string | number): string;
	label:
		| {
				type: 'qualitative';
				val: {
					[key: string]: string;
				};
		  }
		| {
				type: 'quantitative';
				val: [number, number];
		  };
}
export type ColorMap = { [key: string]: TColor };

export default function barcolorsFactory(): { [data: string]: ColorMap } {
	const res = { book: {}, rent: {}, patron: {} };
	for (const [data, dims] of Object.entries(colors)) {
		for (const [dim, val] of Object.entries(dims)) {
			if (!val.length) {
				res[data][dim] = (d: string | number) => {
					const color = d in val ? val[d] : 'gainsboro';
					return color;
				};
				res[data][dim].label = { type: 'qualitative', val };
			} else {
				res[data][dim] = (d: string | number) => {
					const scale = d3.scaleLinear().domain(val).range([0, 1]);

					return d3.interpolateBlues(scale(<number>d));
				};
				res[data][dim].label = { type: 'quantitative', val };
			}
		}
	}
	return res;
}
