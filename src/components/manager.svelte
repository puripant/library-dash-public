<script lang="ts">
	import * as d3 from 'd3';
	import type { TData, TFilter } from '../types';

	import type { ColorMap } from '../utils/barcolors';
	import type { TMetadata } from '../utils/metadata';

	export let name: string,
		dataset: TData[keyof TData],
		colorMap: ColorMap[keyof ColorMap],
		metadata: TMetadata[keyof TMetadata],
		add: (
			data: TData[keyof TData],
			name: string,
			xDim: string,
			stackDim: string,
			color: ColorMap[keyof ColorMap],
			filter?: TFilter[]
		) => void;

	const dims = Object.entries(metadata);

	let [xDim, stackDim] = d3.shuffle(dims.map(([dim]) => dim));

	$: readyToAdd = !!(xDim && stackDim);
</script>

<div class="flex flex-col mb-10">
	<h2 class="text-xl text-center">{name}</h2>
	<div class="flex flex-col">
		<h3 class="dataset-title">xDim</h3>
		<select bind:value={xDim}>
			{#each dims as [dim, title] (dim)}
				<option value={dim}>
					{title}
				</option>
			{/each}
		</select>
	</div>
	<h3 class="dataset-title">stackDim</h3>
	<select bind:value={stackDim}>
		{#each dims as [dim, title] (dim)}
			<option value={dim}>
				{title}
			</option>
		{/each}
	</select>
	<button
		class={`${
			readyToAdd ? 'bg-blue-400' : 'bg-gray-600 pointer-events-none'
		} text-white px-2 py-1 mt-3`}
		disabled={!readyToAdd}
		on:click={() => {
			add(dataset, '-', xDim, stackDim, colorMap);
		}}>Add</button
	>
</div>

<style>
	.dataset-title {
		@apply m-3;
	}

	select {
		@apply border;
		@apply p-1;
	}
</style>
