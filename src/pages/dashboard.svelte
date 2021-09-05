<script lang="ts">
	import { onMount } from 'svelte';

	import { Wave as Spinner } from 'svelte-loading-spinners';
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.js';

	import * as d3 from 'd3';

	import id from '../utils/id';
	import Card from '../components/card.svelte';
	import barcolorsFactory from '../utils/barcolors';

	import { Dataset } from '../types/index';
	import type { TFilter, TRent, TBook, TDataset, TAdd } from '../types/index';
	import type { ValueOf } from '../types/helper';
	import metadata from '../utils/metadata';
	import Manager from '../components/manager.svelte';

	let dataset: TDataset;
	let ready = false;

	const COLS = 6;
	onMount(async () => {
		const rent: TRent[] = await d3.json('/data/rent.json');
		const book: TBook[] = await d3.json('/data/book.json');
		dataset = {
			[Dataset.Rent]: {
				title: 'Rent',
				data: rent,
				colorMap: barcolorsFactory(rent, metadata.rent),
				metadata: metadata.rent
			},
			[Dataset.Book]: {
				title: 'Book',
				data: book,
				colorMap: barcolorsFactory(book, metadata.book),
				metadata: metadata.book
			}
		};

		ready = true;
	});

	$: items = [];

	const cols = [[1200, 6]];

	const add: TAdd = (
		dataset: ValueOf<TDataset>,
		name: string,
		xDim: string,
		stackDim: string,
		filter: TFilter[] = []
	) => {
		let newItem = {
			6: gridHelp.item({
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
		add(dataset, name, xDim, stackDim, filter);
	};

	const remove = (item) => {
		items = items.filter((value) => value.id !== item.id);
	};
</script>

<main class="w-screen h-screen flex flex-row">
	{#if ready}
		<nav>
			{#each Object.values(dataset) as dataset (dataset)}
				<Manager {dataset} {add} />
			{/each}
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
