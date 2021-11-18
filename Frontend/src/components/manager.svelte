<script lang="ts">
	import type { TAdd, TDataset } from '../types';
	import DataController from './dataController.svelte';
	import IoController from './IOController.svelte';
	import PresetController from './presetController.svelte';

	export let dataset: TDataset, add: TAdd, items: any;
</script>

<IoController {items} {dataset} {add} />

<PresetController {dataset} {add} />

{#each Object.values(dataset) as dataset (dataset)}
	<DataController {dataset} {add} />
{/each}
