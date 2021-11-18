<script lang="ts">
	import * as d3 from 'd3';
	import { createEventDispatcher } from 'svelte';
	import Bar from './bar.svelte';
	import type { TBardata } from '../types';
	import type { TColor } from 'src/utils/barcolors';
	import Labels from './labels.svelte';

	export let data: Array<TBardata> = [],
		color: TColor,
		label: string;

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

	let yMin = 0,
		yMax = d3.max(data, (d) => d.y.reduce((prev, cur) => (prev += cur.y2), 0));
	$: Y = d3
		.scaleLinear()
		.domain([yMin, yMax])
		.range([h - margin.bottom, margin.top])
		.nice();

	$: X = d3
		.scaleBand()
		.domain(bardata.map((d) => d.x))
		.range([margin.left, w - margin.right])
		.padding(0.25);

	let showScaleDialog = false;
</script>

<div class="w-full h-full flex flex-col">
	<div class="w-full h-full" bind:clientHeight={h} bind:clientWidth={w}>
		{#if showScaleDialog}
			<div
				class="w-44 h-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-400 text-white rounded opacity-90 text-center py-2"
			>
				<span
					on:pointerdown={(e) => e.stopPropagation()}
					on:click={() => (showScaleDialog = false)}
					class="cursor-pointer absolute top-1 left-2"
				>
					✕
				</span>
				ปรับแกน Y
				<div class="flex justify-evenly text-sm">
					<div class="flex flex-col	justify-center w-1/3">
						<label for="min">ต่ำสุด</label>
						<input
							id="min"
							type="number"
							bind:value={yMin}
							class="text-black w-full px-1 font-mono text-sm"
						/>
					</div>
					<div class="flex flex-col	justify-center w-1/3">
						<label for="max">สูงสุด</label>
						<input
							id="max"
							type="number"
							bind:value={yMax}
							class="text-black w-full px-1 font-mono text-sm"
						/>
					</div>
				</div>
			</div>
		{/if}
		<svg class="w-full h-full">
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
			<g
				transform={`translate(${margin.left}, 0)`}
				class="cursor-pointer"
				on:click={() => (showScaleDialog = true)}
			>
				<!-- Hitbox -->
				<rect
					x={-margin.left}
					width={margin.left}
					height={h - margin.bottom - 25}
					fill="transparent"
				/>
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

			// Label box on top right
			<Labels title={label} w={w * 0.7} h={155} {margin} {color} />

			<!-- next and back -->
			<g
				on:click={() => {
					slicer = Math.min(slicer + 1, data.length - 5);
				}}
				transform={`translate(${w - margin.right / 2 + 6}, ${h - margin.bottom - 10})`}
				style="cursor: pointer;"
			>
				<path d="M-10, -10 l10 10 l-10 10" stroke="black" fill="transparent" />
			</g>
			<g
				on:click={() => (slicer = Math.max(0, slicer - 1))}
				transform={`translate(${margin.left / 2 - 12}, ${h - margin.bottom - 10})`}
				style="cursor: pointer;"
			>
				<path d="M10, -10 l-10 10 l10 10" stroke="black" fill="transparent" />
			</g>
		</svg>
	</div>
</div>
