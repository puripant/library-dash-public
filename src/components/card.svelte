<script lang="ts">
	import type { TColor } from 'src/utils/barcolors';
	import metadata from '../utils/metadata';

	import { createEventDispatcher } from 'svelte';

	import Barchart from '../components/barchart.svelte';
	import type { TData, TDataCB } from '../types';

	export let data: Array<TData>, datacb: TDataCB, dim: string, name: string, color: TColor;

	let basedim = 'day';
	$: bardata = datacb(data, basedim, dim);

	const dispatch = createEventDispatcher();

	function forward(event) {
		dispatch('filter', event.detail);
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
	<div id="base-dim" class="w-full flex flex-row justify-evenly items-center">
		{#each Object.entries(metadata) as [key, title]}
			<div
				class={`text-black flex-1 text-center border-2 border-white rounded cursor-pointer ${
					title === basedim ? 'bg-blue-100' : ''
				}`}
				on:click={() => (basedim = key)}
			>
				{title}
			</div>
		{/each}
	</div>
	<div class="flex-1">
		<Barchart data={bardata} {dim} {name} {color} on:filter={forward} />
	</div>
</div>
