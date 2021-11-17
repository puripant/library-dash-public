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

<div class="flex flex-col mb-5 pb-5 border-b-2 ">
	<h2 class="text-xl text-center">{title}</h2>
	<div class="flex flex-col">
		<h3 class="dataset-title">แกน X</h3>
		<select bind:value={xDim}>
			{#each dims as [dim, title] (dim)}
				<option value={dim}>
					{title}
				</option>
			{/each}
		</select>
	</div>
	<h3 class="dataset-title">แกน Stack</h3>
	<select bind:value={stackDim}>
		{#each dims as [dim, title] (dim)}
			<option value={dim}>
				{title}
			</option>
		{/each}
	</select>
	<button
		class={`bg-blue-400 text-white px-2 py-1 mt-3 rounded`}
		disabled={!readyToAdd}
		on:click={() => {
			add({ dataset, name: '-', xDim, stackDim, filter: [] });
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
		@apply rounded;
	}
</style>
