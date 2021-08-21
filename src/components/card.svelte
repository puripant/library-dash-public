<script lang="ts">
	import type { TColor } from 'src/utils/barcolors';
	import metadata from '../utils/metadata';
	import formatAndFilter from '../utils/formatAndFilter';

	import { createEventDispatcher } from 'svelte';

	import Barchart from '../components/barchart.svelte';
	import type { TData, TFilter } from '../types';

	export let data: Array<TData>,
		name: string,
		color: TColor,
		xDim: string,
		stackDim: string,
		filter: TFilter;

	$: bardata = formatAndFilter(data, xDim, stackDim, filter);

	const dispatch = createEventDispatcher();

	function forward(event) {
		dispatch('filter', { filter: { dim: stackDim, value: event.detail }, stackDim, xDim });
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
	<div class="flex-1">
		<Barchart data={bardata} {name} color={color[stackDim]} on:filter={forward} />
	</div>
</div>
