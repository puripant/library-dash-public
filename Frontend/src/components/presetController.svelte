<script lang="ts">
	import type { IAdd, TAdd, TDataset } from '../types';

	export let dataset: TDataset, add: TAdd;

	const PRESETS: { name: string; cards: IAdd[] }[] = [
		{
			name: 'วิศวกรรมการประปา',
			cards: [
				{
					dataset: dataset['Book'],
					name: '-',
					xDim: 'library',
					stackDim: 'library',
					filter: [{ dim: 'title', value: 'วิศวกรรมการประปา' }]
				},
				{
					dataset: dataset['Rent'],
					name: '-',
					xDim: 'library',
					stackDim: 'faculty',
					filter: [{ dim: 'title', value: 'วิศวกรรมการประปา' }]
				}
			]
		},
		{
			name: 'ฟิสิกส์ 1',
			cards: [
				{
					dataset: dataset['Book'],
					name: '-',
					xDim: 'library',
					stackDim: 'library',
					filter: [{ dim: 'title', value: 'ฟิสิกส์ 1' }]
				},
				{
					dataset: dataset['Rent'],
					name: '-',
					xDim: 'library',
					stackDim: 'faculty',
					filter: [{ dim: 'title', value: 'ฟิสิกส์ 1' }]
				}
			]
		},
		{
			name: 'เวลาที่เข้ายืมที่หอกลาง',
			cards: [
				{
					dataset: dataset['Rent'],
					name: '-',
					xDim: 'library',
					stackDim: 'faculty',
					filter: []
				},
				{
					dataset: dataset['Rent'],
					name: '-',
					xDim: 'faculty',
					stackDim: 'faculty',
					filter: [{ dim: 'library', value: 'Central Library' }]
				},
				{
					dataset: dataset['Rent'],
					name: '-',
					xDim: 'month',
					stackDim: 'period',
					filter: [
						{ dim: 'library', value: 'Central Library' },
						{ dim: 'faculty', value: 'Education' }
					]
				},
				{
					dataset: dataset['Rent'],
					name: '-',
					xDim: 'month',
					stackDim: 'period',
					filter: [
						{ dim: 'library', value: 'Central Library' },
						{ dim: 'faculty', value: 'Others' }
					]
				}
			]
		}
	];
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
			for (const preset of selectedPreset.cards) {
				add(preset);
			}
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
