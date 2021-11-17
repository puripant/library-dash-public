<script lang="ts">
	import formatAndFilter from '../utils/formatAndFilter';

	import { createEventDispatcher } from 'svelte';

	import Barchart from '../components/barchart.svelte';
	import type { TDataset, TFilter } from '../types';
	import type { ValueOf } from 'src/types/helper';
	import { Wave as Spinner } from 'svelte-loading-spinners';
	import { tooltip } from './tooltip.store';

	export let dataItem: {
		dataset: ValueOf<TDataset>;
		name: string;
		xDim: string;
		stackDim: string;
		filter: TFilter[];
	};
	let { dataset, xDim, stackDim, filter = [] } = dataItem;
	let { title, data, metadata, colorMap } = dataset;
	$: bardataPromise = formatAndFilter(data, xDim, stackDim, filter);

	const dispatch = createEventDispatcher();

	function forward(event) {
		const { axis, value } = event.detail;
		const newFilter = {
			dim: axis === 'x' ? xDim : stackDim,
			value
		};

		const filters = {
			dataset,
			filter: [...filter, newFilter],
			stackDim,
			xDim
		};
		dispatch('filter', filters);
	}

	function handleHover(event: {
		detail:
			| {
					xDatum: string;
					stackDatum: string;
					count: number;
					top: number;
					left: number;
			  }
			| false;
	}) {
		if (event.detail) {
			$tooltip = { ...event.detail, xDim: metadata[xDim], stackDim: metadata[stackDim] };
		} else {
			$tooltip = null;
		}
	}

	function removeEvent() {
		dispatch('remove');
	}

	const dims = Object.entries(metadata);
</script>

<div class="w-full h-full border-2 border-black flex flex-col">
	<div id="top-bar" class="w-full flex bg-gray-200 px-2">
		<span on:pointerdown={(e) => e.stopPropagation()} on:click={removeEvent} class="cursor-pointer">
			✕
		</span>
		<div
			on:pointerdown={(e) => dispatch('move', e)}
			class="flex-1 cursor-pointer text-center text-black"
		>
			{title}
		</div>
	</div>
	<div class="w-full flex flex-row justify-evenly items-center px-2 text-sm mt-2">
		<h3 class="w-1/2">แกน X</h3>
		<select bind:value={xDim}>
			{#each dims as [dim, title] (dim)}
				<option value={dim}>
					{title}
				</option>
			{/each}
		</select>
	</div>
	<div class="w-full flex flex-row justify-evenly items-center px-2 text-sm">
		<h3 class="w-1/2">แกน stack</h3>
		<select bind:value={stackDim}>
			{#each dims as [dim, title] (dim)}
				<option value={dim}>
					{title}
				</option>
			{/each}
		</select>
	</div>
	<h2 class="text-center px-2 mt-2 text-xs">
		<h3 class="mb-1">ตัวกรอง</h3>
		{#each filter as { dim, value } (dim)}
			<div class="flex flex-row justify-between items-center mb-1">
				<span class="mr-2">
					{metadata[dim]}
				</span>
				<input class="border-b-2 px-2" bind:value />
				<button
					class="bg-red-500 text-white px-1 rounded"
					on:click={() => {
						const idx = filter.findIndex(({ dim: fdim }) => fdim === dim);
						filter.splice(idx, 1);
						filter = filter;
					}}>x</button
				>
			</div>
		{/each}
	</h2>
	{#await bardataPromise}
		<div class="w-full h-full flex justify-center items-center">
			<Spinner size="60" color="hsl(200, 60%, 40%)" unit="px" duration="1s" />
		</div>
	{:then bardata}
		<div class="flex-1">
			<Barchart
				data={bardata}
				color={colorMap[stackDim]}
				on:filter={forward}
				on:hover={handleHover}
			/>
		</div>
	{/await}
</div>

<style>
	select {
		@apply text-sm;
		@apply border;
		@apply w-1/2;
		@apply p-1;
	}
</style>
