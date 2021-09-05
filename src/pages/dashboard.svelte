<script lang="ts">
	import { onMount } from 'svelte';

	import { Wave as Spinner } from 'svelte-loading-spinners';
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.js';

	import * as d3 from 'd3';

	import id from '../utils/id';
	import Card from '../components/card.svelte';
	import barcolorsFactory from '../utils/barcolors';
	import type { ColorMap } from '../utils/barcolors';

	import type { TData, TFilter, TRent, TBook } from '../types/index';
	import metadata from '../utils/metadata';
	import Manager from '../components/manager.svelte';

	let data: TData = { rent: [], book: [] };
	let barcolors: ColorMap;
	let ready = false;

	const COLS = 6;
	onMount(async () => {
		const rent: TRent[] = await d3.json('/data/rent.json');
		const book: TBook[] = await d3.json('/data/book.json');
		data = {
			rent,
			book
		};

		barcolors = barcolorsFactory(data, metadata);
		ready = true;
	});

	$: items = [];

	const cols = [[1200, 6]];

	function add(
		data: TData[keyof TData],
		name: string,
		xDim: string,
		stackDim: string,
		color: ColorMap[keyof ColorMap],
		filter: TFilter[] = []
	) {
		let newItem = {
			6: gridHelp.item({
				w: 2,
				h: 5,
				x: 0,
				y: 0,
				customDragger: true
			}),
			id: id(),
			color,
			data,
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
	}

	const addByFilter = (event: {
		detail: {
			xDim: string;
			stackDim: string;
			filter: TFilter[];
		};
	}) => {
		const { xDim, stackDim, filter = [] } = event.detail;

		const name = filter.map((f) => `${metadata[f.dim]}: ${f.value}`).join('\n');
		add(data.rent, name, xDim, stackDim, barcolors.rent, filter);
	};

	const remove = (item) => {
		items = items.filter((value) => value.id !== item.id);
	};
</script>

<main class="w-screen h-screen flex flex-row">
	{#if ready}
		<nav>
			<Manager
				name="Rent"
				dataset={data.rent}
				metadata={metadata.rent}
				colorMap={barcolors.rent}
				{add}
			/>
			<Manager
				name="Book"
				dataset={data.book}
				metadata={metadata.book}
				colorMap={barcolors.book}
				{add}
			/>
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
