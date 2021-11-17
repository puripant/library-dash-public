<script lang="ts">
	import * as d3 from 'd3';
	import { createEventDispatcher } from 'svelte';
	import Bar from './bar.svelte';
	import type { TBardata } from '../types';
	import type { TColor } from 'src/utils/barcolors';
	import { max } from 'd3';

	export let data: Array<TBardata> = [],
		color: TColor;

	export const margin = {
		top: 20,
		right: 20,
		bottom: 75,
		left: 40
	};

	let w = 300,
		h = 150;

	let slicer = 0;

	const dispatch = createEventDispatcher();

	function forward(event) {
		dispatch('filter', event.detail);
	}

	function handleHover(event) {
		dispatch('hover', event.detail);
	}

	$: bardata = data.slice(slicer, slicer + 5);

	$: Y = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d.y.reduce((prev, cur) => (prev += cur.y2), 0))])
		.range([h - margin.bottom, margin.top])
		.nice();

	$: X = d3
		.scaleBand()
		.domain(bardata.map((d) => d.x))
		.range([margin.left, w - margin.right])
		.padding(0.25);
</script>

<div class="w-full h-full flex flex-col">
	<div class="w-full flex-1" bind:clientHeight={h} bind:clientWidth={w}>
		<svg class="w-full h-full">
			<!-- next and back -->
			<g
				on:click={() => {
					slicer = Math.min(slicer + 1, data.length - 5);
				}}
				transform={`translate(${w - margin.right / 2 + 6}, ${h / 2 - 10})`}
				style="cursor: pointer;"
			>
				<path d="M-10, -10 l10 10 l-10 10" stroke="black" fill="transparent" />
			</g>
			<g
				on:click={() => (slicer = Math.max(0, slicer - 1))}
				transform={`translate(${margin.left / 2 - 12}, ${h / 2 - 10})`}
				style="cursor: pointer;"
			>
				<path d="M10, -10 l-10 10 l10 10" stroke="black" fill="transparent" />
			</g>

			<!-- X Axis -->
			<g transform={`translate(0, ${h - margin.bottom + 10})`}>
				{#each bardata as d}
					<g transform={`translate(${X(d.x) + X.bandwidth() / 2} , 0)`}>
						<text
							class="cursor-pointer"
							text-anchor="start"
							transform={'rotate(45)'}
							font-size={10}
							on:click={() => forward({ detail: { axis: 'x', value: d.x } })}>{d.x}</text
						>
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
					<Bar {X} {Y} data={d} {color} on:filter={forward} on:hover={handleHover} />
				{/each}
			</g>
		</svg>
	</div>
</div>
