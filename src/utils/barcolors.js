import * as d3 from 'd3';

export default function barcolorsFactory(dataset, metadata) {
	console.log('--- metadata :', metadata, ' ---');
	const alldims = Object.values(dataset).flat();
	console.log('--- alldims :', alldims, ' ---');
	const colors = {};

	for (const dim of Object.keys(metadata)) {
		const possibleValues = [
			...new Set(
				alldims
					.map((d) => {
						return d[dim].flat().map((d) => d.key);
					})
					.flat()
			)
		];

		if (isNaN(+possibleValues[0])) {
			// Nominal
			console.log('--- nominal :', possibleValues, ' ---');
			console.log(d3.schemeTableau10);
			const color = {};
			for (let i = 0; i < possibleValues.length; i++) {
				color[possibleValues[i]] = d3.schemeTableau10[i];
			}
			colors[dim] = (val) => color[val];
		} else {
			console.log('--- ordinal :', possibleValues, ' ---');
			// Ordinal
			const vals = possibleValues.map((d) => +d);

			const scale = d3.scaleLinear().domain(d3.extent(vals)).range([0, 1]);

			colors[dim] = (val) => d3.interpolateBlues(scale(val));
		}
	}
	console.log('--- colors :', colors, ' ---');
	return colors;
}
