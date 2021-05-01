<script>
	import * as d3 from 'd3';
	export let X = () => 0,
		Y = () => 0,
		w = 300,
		h = 150,
		margin = {
			top: 20,
			right: 20,
			bottom: 50,
			left: 40
		};
	export let data = { x: '', y: [{ x2: '02', y2: 5 }] };
	$: bardata = {
		x: data.x,
		y: data.y
			.map((k) => {
				const [x2, y2] = Object.values(k);
				return { x2, y2 };
			})
			.sort((a, b) => +a.x2 - b.x2)
	};

	$: console.log('b', bardata);
	$: console.log(d3.cumsum(bardata.y, (d) => d.y2));

	let accumulator = 0;
	$: stackdata = bardata.y.reduce((acc, cur, idx) => {
		if (idx === 0) {
			return acc;
		}
		return [
			...acc,
			{
				...cur,
				y: (accumulator += cur.y2)
			}
		];
	}, []);

	$: console.log('stack', stackdata);
</script>

<!-- {#each stackdata.y as d, i}
	<rect
		x={X(data.x)}
		y={Y(d.y)}
		width={X.bandwidth()}
		height={h - d.y}
		fill={`hsl(${(i * 360) / 5}, 50%, 60%)`}
	/>
{/each} -->
