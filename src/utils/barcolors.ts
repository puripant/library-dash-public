import * as d3 from 'd3';
import type { TData } from '../types';

import type { TMetadata } from './metadata';

export type TColor = (val: string | number) => string;
export type ColorMap = { [key: string]: { [key: string]: TColor } };

export default function barcolorsFactory(dataset: TData, metadata: TMetadata): ColorMap {
	console.log('--- dataset :', dataset, ' ---');
	const res = Object.entries(dataset).reduce((prev, [name, dataset]) => {
		console.log('--- name :', name, ' ---');
		const alldims = Object.keys(metadata[name]);
		const colors: { [key: string]: TColor } = {};

		for (const dim of alldims) {
			// @ts-ignore
			const groupByDim = [...d3.group(dataset, (d) => d[dim])].sort(function sortByCount(a, b) {
				const countA = a.values.length;
				const countB = b.values.length;
				return countB - countA;
			});

			const possibleValues = groupByDim.map(([dim]) => dim);

			if (isNaN(+possibleValues[0])) {
				// Nominal
				const color = {};
				for (let i = 0; i < possibleValues.length; i++) {
					// @ts-ignore
					color[possibleValues[i]] = d3.schemeTableau10[i];
				}
				colors[dim] = (val: string | number) => (val === 'others' ? 'gainsboro' : color[val]);
			} else {
				// Ordinal
				const vals = possibleValues.map((d) => +d);

				const scale = d3.scaleLinear().domain(d3.extent(vals)).range([0, 1]);

				colors[dim] = (val: string | number) => d3.interpolateBlues(scale(<number>val));
			}
		}
		return { ...prev, [name]: colors };
	}, {});

	return res;
}
