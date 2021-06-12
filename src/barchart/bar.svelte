<script>
	export let X = () => 0,
		Y = () => 0;
	export let data = { x: '', y: [{ x2: '02', y2: 5 }] };
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
			y={Y(d.y)}
			width={X.bandwidth()}
			height={Y(d.prev) - Y(d.y)}
			fill={`hsl(${(i * 360) / data.y.length}, 50%, 60%)`}
		/>
	{/each}
</g>
