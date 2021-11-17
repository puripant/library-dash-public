<script lang="ts">
	import { onMount } from 'svelte';

	import { Wave as Spinner } from 'svelte-loading-spinners';
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.js';

	import id from '../utils/id';
	import Card from '../components/card.svelte';
	import barcolorsFactory from '../utils/barcolors';

	import type { TFilter, TDataset, TAdd } from '../types/index';
	import type { ValueOf } from '../types/helper';
	import metadata from '../utils/metadata';
	import Manager from '../components/manager.svelte';

	let dataset: TDataset;
	let ready = false;

	const COLS = 12;
	onMount(async () => {
		const barColor = barcolorsFactory();
		console.log('barColor', barColor);
		dataset = {
			Rent: {
				title: 'ชุดข้อมูลการยืม',
				data: 'rent',
				metadata: metadata.rent,
				colorMap: barColor['rent']
			},
			Book: {
				title: 'ชุดข้อมูลหนังสือ',
				data: 'book',
				metadata: metadata.book,
				colorMap: barColor['book']
			},
			Patron: {
				title: 'ชุดข้อมูลสมาชิก',
				data: 'patron',
				metadata: metadata.patron,
				colorMap: barColor['patron']
			}
		};

		ready = true;
	});

	$: items = [];

	const cols = [[1920, COLS]];

	const add: TAdd = ({
		dataset,
		name,
		xDim,
		stackDim,
		filter = []
	}: {
		dataset: ValueOf<TDataset>;
		name: string;
		xDim: string;
		stackDim: string;
		filter: TFilter[];
	}) => {
		let newItem = {
			[COLS]: gridHelp.item({
				w: 2,
				h: 5,
				x: 0,
				y: 0,
				customDragger: true
			}),
			id: id(),
			dataset,
			name,
			xDim,
			stackDim,
			filter
		};

		let findOutPosition = gridHelp.findSpace(newItem, items, COLS);

		newItem = {
			...newItem,
			[COLS]: {
				...newItem[COLS],
				...findOutPosition
			}
		};

		items = [...items, newItem];
	};

	const addByFilter = (event: {
		detail: {
			dataset: ValueOf<TDataset>;
			xDim: string;
			stackDim: string;
			filter: TFilter[];
		};
	}) => {
		const { dataset, xDim, stackDim, filter = [] } = event.detail;
		const { metadata } = dataset;

		const name = filter.map((f) => `${metadata[f.dim]}: ${f.value}`).join('\n');
		add({ dataset, name, xDim, stackDim, filter });
	};

	const remove = (item) => {
		items = items.filter((value) => value.id !== item.id);
	};
</script>

<main class="w-screen h-screen flex flex-row">
	{#if ready}
		<nav>
			<Manager {dataset} {add} />
		</nav>
		<div id="visualise" class="p-4 overflow-y-auto flex-1 h-screen">
			<Grid bind:items rowHeight={100} let:dataItem {cols} let:movePointerDown>
				<Card
					on:filter={addByFilter}
					on:remove={() => remove(dataItem)}
					on:move={(e) => movePointerDown(e.detail)}
					{dataItem}
				/>
			</Grid>
		</div>
	{:else}
		<div class="w-full h-full flex justify-center items-center">
			<Spinner size="60" color="hsl(200, 60%, 40%)" unit="px" duration="1s" />
		</div>
	{/if}
</main>

<style lang="postcss">
	nav {
		@apply w-52;
		@apply border-r-2;
		@apply h-full;
		@apply p-3;
	}
</style>
