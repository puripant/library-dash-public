<script lang="ts">
	import * as d3 from 'd3';
	import type { ValueOf } from '../types/helper';
	import type { TAdd, TDataset } from '../types';

	export let dataset: ValueOf<TDataset>, add: TAdd;

	let { title, metadata } = dataset;

	const dims = Object.entries(metadata);

	let [xDim, stackDim] = d3.shuffle(dims.map(([dim]) => dim));

	$: readyToAdd = !!(xDim && stackDim);
</script>

<div class="flex flex-col mb-10">
	<h2 class="text-xl text-center">{title}</h2>
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
			add(dataset, '-', xDim, stackDim, []);
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
