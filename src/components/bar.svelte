<script lang="ts">
	import * as d3 from 'd3';
	import type { TBardata, TFilter, TStadckdata } from 'src/types';
	import type { TColor } from 'src/utils/barcolors';
	import { createEventDispatcher } from 'svelte';
	export let X = d3.scaleBand(),
		Y = d3.scaleLinear();
	export let data: TBardata = { x: '', y: [{ x2: '02', y2: 5 }] },
		color: TColor;

	const dispatch = createEventDispatcher();

	function filter(filterValue: string): void {
		dispatch('filter', { axis: 'stack', value: filterValue });
	}

	function hover(xDatum: string, d?: TStadckdata) {
		dispatch(
			'hover',
			d
				? {
						// tooltip: x.length === 0 ? x : `แกน X: ${x} \n cd: ${d.x2} count: ${d.y2}`
						xDatum,
						stackDatum: d.x2,
						count: d.y2
				  }
				: false
		);
	}

	$: bardata = {
		x: data.x,
		y: data.y
			.map((k) => {
				const [x2, y2] = Object.values(k);
				return { x2, y2 };
			})
			.sort((a, b) => +a.x2 - +b.x2)
	};

	$: stackdata = (() => {
		let accumulator = 0;
		const stackdata: Array<TStadckdata> = bardata.y.reduce((acc, cur, idx) => {
			return [
				...acc,
				{
					...cur,
					y: (accumulator += +cur.y2),
					prev: acc.length ? acc[idx - 1].y : 0
				}
			];
		}, []);
		return stackdata;
	})();
</script>

<g transform={`translate(${X(data.x)}, 0)`}>
	{#each stackdata as d, i}
		<rect
			class="cursor-pointer"
			y={Y(d.y)}
			width={X.bandwidth()}
			height={Y(d.prev) - Y(d.y)}
			fill={color(d.x2)}
			on:click={() => filter(d.x2)}
			on:mouseenter={() => hover(data.x, d)}
			on:mouseleave={() => hover('')}
		/>
	{/each}
</g>
