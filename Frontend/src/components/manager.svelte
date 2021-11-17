<script lang="ts">
	import * as d3 from 'd3';
	import type { ValueOf } from '../types/helper';
	import type { TAdd, TDataset } from '../types';
	import DataController from './dataController.svelte';

	export let dataset: ValueOf<TDataset>, add: TAdd;
</script>

<DataController {dataset} {add} />
