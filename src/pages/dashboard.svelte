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

	import type { TData, TDataCB, TStadckdata } from '../types/index';
	import metadata from '../utils/metadata';

	const basedim = 'library';

	let data: Array<TData> = [];
	let barcolors: ColorMap;
	let ready = false;

	const COLS = 6;
	onMount(async () => {
		data = await d3.json('/data/data.json');

		barcolors = barcolorsFactory(data, metadata);
		ready = true;
	});

	$: items = [];

	const cols = [[1200, 6]];

	function add(dim: string, data: Array<TData>, datacb: TDataCB, name: string) {
		let newItem = {
			6: gridHelp.item({
				w: 2,
				h: 5,
				x: 0,
				y: 0,
				customDragger: true
			}),
			id: id(),
			data,
			datacb,
			dim: dim,
			name,
			color: barcolors[dim]
		};

		let findOutPosition = gridHelp.findSpace(newItem, items, COLS);

		newItem = {
			...newItem,
			[COLS]: {
				...newItem[COLS],
				...findOutPosition
			}
		};

		items = [...items, ...[newItem]];
	}

	const addByFilter = (event: {
		detail: {
			dim: string;
			data: TStadckdata;
		};
	}) => {
		const {
			dim,
			data: { x2 }
		} = event.detail;

		const filter: TDataCB = (data, basedim, dim) => {
			const dataByBaseDim = d3.group(
				data,
				(d) => d[basedim],
				(d) => d[dim]
			);
			const res = Array.from(dataByBaseDim.entries()).map(([x, y]) => ({
				x,
				y: Array.from(y.entries()).map(([z, w]) => ({
					x2: z,
					y2: w.filter((v) => v[dim] === x2).length
				}))
			}));
			return res;
		};
		add(dim, data, filter, `${metadata[dim]} (${x2})`);
	};

	const remove = (item) => {
		items = items.filter((value) => value.id !== item.id);
	};

	const format: TDataCB = (data: Array<TData>, basedim: string, dim: string) => {
		const dataByBaseDim = d3.group(
			data,
			(d) => d[basedim],
			(d) => d[dim]
		);
		const res = Array.from(dataByBaseDim.entries()).map(([x, y]) => ({
			x,
			y: Array.from(y.entries()).map(([z, w]) => ({ x2: z, y2: w.length }))
		}));
		return res;
	};
</script>

<main class="w-screen h-screen flex flex-row">
	{#if ready}
		<nav>
			<h1>{basedim}</h1>
			<ul class="flex flex-col">
				{#each Object.entries(metadata) as [dim, title]}
					<li>
						{title}
						<button
							on:click={() => {
								add(dim, data, format, title);
							}}>+</button
						>
					</li>
				{/each}
			</ul>
		</nav>
		<div id="visualise" class="p-4 overflow-y-auto flex-1 h-screen">
			<Grid bind:items rowHeight={100} let:dataItem {cols} let:movePointerDown>
				<Card
					on:filter={addByFilter}
					on:remove={() => remove(dataItem)}
					on:move={(e) => movePointerDown(e.detail)}
					{...dataItem}
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

	h1 {
		@apply text-center;
		@apply text-red-600;
		@apply capitalize;
		@apply text-xl;
	}
</style>
