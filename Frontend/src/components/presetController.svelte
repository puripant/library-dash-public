<script lang="ts">
	import type { ArgsType } from 'src/types/helper';

	import type { IAdd, TAdd, TDataset } from '../types';

	export let dataset: TDataset, add: TAdd;

	const PRESETS: { name: string; cards: IAdd[] }[] = [];
	let selectedPreset = PRESETS[0];
</script>

<div class="flex flex-col mb-5 pb-5 border-b-2 ">
	<h2 class="text-xl text-center">Preset</h2>
	<div class="flex flex-col">
		<h3 class="dataset-title">เลือก Preset</h3>
		<select bind:value={selectedPreset}>
			{#each PRESETS as preset (preset)}
				<option value={preset}>
					{preset.name}
				</option>
			{/each}
		</select>
	</div>
	<button
		class={`bg-blue-400 text-white px-2 py-1 mt-3 rounded`}
		on:click={() => {
			// add(dataset, '-', xDim, stackDim, []);
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
