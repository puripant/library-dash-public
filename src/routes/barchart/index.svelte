<script>
	import * as d3 from 'd3';
	export let data = [];
	export const margin = {
		top: 20,
		right: 20,
		bottom: 20,
		left: 20
	};

	let w = 300,
		h = 150;

	let slicer = 0;

	$: bardata = data.slice(slicer, slicer + 5);
	$: console.log('bardata', bardata);

	$: Y = d3
		.scaleLinear()
		.domain([0, d3.max(bardata, (d) => d.y)])
		.range([h - margin.top, margin.bottom]);

	$: X = d3
		.scaleBand()
		.domain(bardata.map((d) => d.x))
		.range([margin.left, w - margin.right])
		.padding(0.2);
</script>

<div class="w-full h-full" bind:clientHeight={h} bind:clientWidth={w}>
	<div id="input-area">
		<div id="slicer">
			{slicer}
			<input type="range" min={5} max={data.length} step={1} bind:value={slicer} />
		</div>
	</div>
	<svg class="w-full h-full">
		<g class="bar">
			{#each bardata as d}
				<rect
					x={X(d.x)}
					y={Y(d.y)}
					width={X.bandwidth()}
					height={h - margin.top - Y(d.y)}
					fill="green"
				/>
			{/each}
		</g>

		<!-- X Scale -->
		<g transform={`translate(0, ${h - margin.top / 2})`}>
			{#each bardata as d}
				<g transform={`translate(${X(d.x) + X.bandwidth() / 2} , 0)`}>
					<text text-anchor="middle">{d.x}</text>
				</g>
			{/each}
		</g>
	</svg>
</div>
