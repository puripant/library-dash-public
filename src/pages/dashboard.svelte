<script>
	import { onMount } from 'svelte';

	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.js';

	import * as d3 from 'd3';

	import id from '../utils/id';
	import Card from '../components/card.svelte';
	import barcolorsFactory from '../utils/barcolors';

	const basedim = 'library';

	let data = { book: [{ checkin_gmt_year: [{ key: '', count: 1 }] }] };
	let metadata = {
		checkout_gmt_year:
			'\u0e08\u0e33\u0e19\u0e27\u0e19\u0e04\u0e23\u0e31\u0e49\u0e07\u0e17\u0e35\u0e48\u0e16\u0e39\u0e01\u0e22\u0e37\u0e21\u0e43\u0e19\u0e1b\u0e35\u0e19\u0e31\u0e49\u0e19 \u0e46'
	};
	let barcolors;

	const COLS = 6;
	onMount(async () => {
		const book = await d3.json('/data/book.json');
		const ptype = await d3.json('/data/ptype.json');
		const location = await d3.json('/data/location.json');
		metadata = await d3.json('/data/metadata.json');

		data = { book, ptype, location };

		barcolors = barcolorsFactory(data, metadata);
	});

	$: items = [];

	const cols = [[1200, 6]];

	/**
	 * @param {string} dim
	 * @param {{
    book: {
        checkin_gmt_year: {
            key: string;
            count: number;
        }[];
    }[];
}} data
	 * @param {(data: { x: any; y: any; }[]) => { x: any; y: any; }[]} datacb
	 * @param {string} name
	 */
	function add(dim, data, datacb, name) {
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

	const addByFilter = (event) => {
		const {
			dim,
			data: { x2 }
		} = event.detail;

		const filter = (data) => {
			return data
				.map((d) => {
					return {
						x: d.basedim,
						y: d[dim].filter((y) => {
							const [f] = Object.values(y);

							return f === x2;
						})
					};
				})
				.sort((x, y) => {
					const a = x.y.reduce((prev, cur) => (prev += cur.count), 0);
					const b = y.y.reduce((prev, cur) => (prev += cur.count), 0);
					return b - a;
				});
		};
		add(dim, data, filter, `${metadata[dim]} (${x2})`);
	};

	const remove = (item) => {
		items = items.filter((value) => value.id !== item.id);
	};
</script>

<main class="w-screen h-screen flex flex-row">
	<nav>
		<h1>{basedim}</h1>
		<ul class="flex flex-col">
			{#each Object.entries(metadata) as [dim, title]}
				<li>
					{title}
					<button
						on:click={() => {
							const format = (data) =>
								data
									.map((d) => ({
										x: d.basedim,
										y: d[dim]
									}))
									.sort((x, y) => {
										const a = x.y.reduce((prev, cur) => (prev += cur.count), 0);
										const b = y.y.reduce((prev, cur) => (prev += cur.count), 0);
										return b - a;
									});

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
