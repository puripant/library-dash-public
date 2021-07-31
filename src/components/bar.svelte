<script>
	import * as d3 from 'd3';
	import colorHash from '../utils/barcolors';
	import { createEventDispatcher } from 'svelte';
	export let X = d3.scaleBand(),
		Y = d3.scaleLinear();
	export let data = { x: '', y: [{ x2: '02', y2: 5 }] };

	const dispatch = createEventDispatcher();

	function filter(x, d) {
		dispatch('filter', {
			x,
			data: d
		});
	}

	function hover(x, d) {
		dispatch('hover', {
			tooltip: x.length === 0 ? x : `basedim: ${x} \n x: ${d.x2} count: ${d.y2}`
		});
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
		const stackdata = bardata.y.reduce((acc, cur, idx) => {
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
			fill={colorHash.hex(d.x2)}
			on:click={() => filter(data.x, d)}
			on:mouseenter={() => hover(data.x, d)}
			on:mouseleave={() => hover('')}
		/>
	{/each}
</g>
