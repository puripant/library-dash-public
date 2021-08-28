<script lang="ts">
	import type { TColor } from 'src/utils/barcolors';
	import metadata from '../utils/metadata';
	import formatAndFilter from '../utils/formatAndFilter';

	import { createEventDispatcher } from 'svelte';

	import Barchart from '../components/barchart.svelte';
	import type { TData, TFilter } from '../types';

	export let dataItem: {
		data: Array<TData>;
		name: string;
		color: TColor;
		xDim: string;
		stackDim: string;
		filter: TFilter[];
	};
	let { data, name, color, xDim, stackDim, filter = [] } = dataItem;
	$: bardata = formatAndFilter(data, xDim, stackDim, filter);

	const dispatch = createEventDispatcher();

	function forward(event) {
		const newFilter = {
			filter: [...filter, { dim: stackDim, value: event.detail }],
			stackDim,
			xDim
		};
		dispatch('filter', newFilter);
	}

	let tooltip = '';

	function handleHover(event: {
		detail:
			| {
					xDatum: string;
					stackDatum: string;
					count: number;
			  }
			| false;
	}) {
		if (event.detail) {
			const { xDatum, stackDatum, count } = event.detail;
			tooltip = `${xDim}: ${xDatum}\n${stackDim}: ${stackDatum} count: ${count}`;
		} else {
			tooltip = 'hover for tooltip';
		}
	}

	function removeEvent() {
		dispatch('remove');
	}
</script>

<div class="w-full h-full border-2 border-black flex flex-col">
	<div id="top-bar" class="w-full flex bg-gray-200 px-2">
		<span on:pointerdown={(e) => e.stopPropagation()} on:click={removeEvent} class="cursor-pointer">
			✕
		</span>
		<div on:pointerdown={(e) => dispatch('move', e)} class="flex-1 cursor-pointer" />
	</div>
	<h3 class="text-center">แกน X</h3>
	<div id="base-dim" class="w-full flex flex-row justify-evenly items-center">
		{#each Object.entries(metadata) as [key, title]}
			<div
				class={`text-black flex-1 text-xs text-center border-2 border-white rounded cursor-pointer ${
					key === xDim ? 'bg-blue-100' : ''
				}`}
				on:click={() => (xDim = key)}
			>
				{title}
			</div>
		{/each}
	</div>
	<h3 class="text-center">แกน stack</h3>
	<div id="dim" class="w-full flex flex-row justify-evenly items-center">
		{#each Object.entries(metadata) as [key, title]}
			<div
				class={`text-black flex-1 text-xs text-center border-2 border-white rounded cursor-pointer ${
					key === stackDim ? 'bg-blue-100' : ''
				}`}
				on:click={() => (stackDim = key)}
			>
				{title}
			</div>
		{/each}
	</div>
	<div id="input-area">
		<h2 class="text-center p-2 text-xs whitespace-pre">
			<div>Filter</div>
			{name}
		</h2>
		<div id="slicer" class="w-full px-2 flex flex-col">
			<p class="text-center text-sm h-10 whitespace-pre flex items-center justify-center">
				{tooltip}
			</p>
		</div>
	</div>
	<div class="flex-1">
		<Barchart data={bardata} color={color[stackDim]} on:filter={forward} on:hover={handleHover} />
	</div>
</div>
