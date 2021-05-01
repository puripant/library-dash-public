<script>
	import { onMount } from 'svelte';

	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index';

	import * as d3 from 'd3';

	// import { page } from '$app/stores';
	import id from '../..//utils/id';
	import Barchart from '../barchart/index.svelte';

	// const {
	// 	params: { basedim }
	// } = $page;
	const basedim = 'library';

	let data = [{ basedim: 0 }];

	const COLS = 6;
	onMount(async () => {
		data = await d3.json('/data/data.json');
		console.log(data);
	});

	let items = [];

	const cols = [[1200, 6]];
	const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

	function add(dim) {
		const bardata = data
			.map((d) => ({
				x: d.basedim,
				y: d[dim].reduce((prev, cur) => (prev += cur.count), 0)
			}))
			.sort((x, y) => y.y - x.y)
			.slice(0, 5);
		let newItem = {
			6: gridHelp.item({
				w: Math.round(randomNumberInRange(1, 4)),
				h: Math.round(randomNumberInRange(1, 4)),
				x: 0,
				y: 0
			}),
			id: id(),
			data: bardata
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

	const remove = (item) => {
		items = items.filter((value) => value.id !== item.id);
	};
</script>

<main class="w-screen h-screen flex flex-row">
	<nav>
		<h1>{basedim}</h1>
		<ul class="flex flex-col">
			{#each Object.keys(data[0]) as dim}
				<li>
					{dim} <button on:click={() => add(dim)}>+</button>
				</li>
			{/each}
		</ul>
	</nav>
	<div id="visualise" class="p-4 overflow-y-auto flex-1 h-screen">
		<Grid bind:items rowHeight={100} let:item let:dataItem {cols}>
			<div class="w-full h-full">
				<span
					on:pointerdown={(e) => e.stopPropagation()}
					on:click={() => remove(dataItem)}
					class="remove"
				>
					✕
				</span>
				<Barchart data={dataItem.data} />
			</div>
		</Grid>
	</div>
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
