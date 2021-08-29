import * as d3 from 'd3';
import type { TData } from '../types';

import type { TMetadata } from './metadata';

export type TColor = (val: string | number) => string;
export type ColorMap = { [key: string]: TColor };

export default function barcolorsFactory(dataset: Array<TData>, metadata: TMetadata): ColorMap {
	const alldims = Object.keys(metadata);
	const colors: ColorMap = {};

	for (const dim of alldims) {
		const possibleValues = [...new Set(dataset.map((d) => d[dim]))];

		if (isNaN(+possibleValues[0])) {
			// Nominal
			const color = {};
			for (let i = 0; i < possibleValues.length; i++) {
				color[possibleValues[i]] = d3.schemeTableau10[i];
			}
			colors[dim] = (val: string | number) => color[val];
		} else {
			// Ordinal
			const vals = possibleValues.map((d) => +d);

			const scale = d3.scaleLinear().domain(d3.extent(vals)).range([0, 1]);

			colors[dim] = (val: string | number) => d3.interpolateBlues(scale(<number>val));
		}
	}
	return colors;
}
