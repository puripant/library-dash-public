<script>
	import * as d3 from 'd3';
	import { createEventDispatcher } from 'svelte';
	import Bar from './bar.svelte';
	export let data = [],
		dim = '';
	export const margin = {
		top: 20,
		right: 20,
		bottom: 50,
		left: 40
	};

	let w = 300,
		h = 150;

	let slicer = 0;

	const dispatch = createEventDispatcher();

	function forward(event) {
		dispatch('filter', { ...event.detail, dim });
	}

	$: bardata = data.slice(slicer, slicer + 5);

	$: Y = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d.y.reduce((prev, cur) => (prev += cur.count), 0))])
		.range([h - margin.bottom, margin.top])
		.nice();

	$: X = d3
		.scaleBand()
		.domain(bardata.map((d) => d.x))
		.range([margin.left, w - margin.right])
		.padding(0.25);
</script>

<div class="w-full h-full flex flex-col">
	<div id="input-area">
		<h2 class="text-center font-bold p-2 text-lg">{dim}</h2>
		<div id="slicer" class="w-full px-2 flex flex-col">
			<p class="text-center text-sm font-">Top {slicer} - {slicer + 5}</p>
		</div>
	</div>
	<div class="w-full flex-1" bind:clientHeight={h} bind:clientWidth={w}>
		<svg class="w-full h-full">
			<!-- X Axis -->
			<g transform={`translate(0, ${h - margin.bottom + 10})`}>
				{#each bardata as d}
					<g transform={`translate(${X(d.x) + X.bandwidth() / 2} , 0)`}>
						<text text-anchor="start" transform={'rotate(45)'} font-size={10}>{d.x}</text>
					</g>
				{/each}
			</g>

			<!-- Y Axis -->
			<g transform={`translate(${margin.left}, 0)`}>
				{#each Y.ticks() as tick}
					<g transform={`translate(0, ${Y(tick)})`}>
						<text text-anchor="end" dominant-baseline="central" font-size={10}
							>{d3.format(',')(tick)}</text
						>
						<line x2={w - margin.left - margin.right} stroke={'rgba(0, 0, 0, 0.2)'} />
					</g>
				{/each}
			</g>

			<g class="bar">
				{#each bardata as d}
					<Bar {X} {Y} data={d} on:filter={forward} />
				{/each}
			</g>
		</svg>
	</div>
	<div id="slicer" class="w-full px-2 flex flex-col">
		<input type="range" class="w-full" min={0} max={data.length} step={1} bind:value={slicer} />
	</div>
</div>
