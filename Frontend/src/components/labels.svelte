<script lang="ts">
	import type { TColor } from 'src/utils/barcolors';

	export let w: number,
		h: number,
		margin: { top: number; right: number; bottom: number; left: number },
		color: TColor;

	let show = false;

	console.log('color', color.label);
</script>

<g
	transform={`translate(${w - margin.right / 2 - (show ? w / 2 : 0)}, ${margin.top / 2})`}
	class="transition-all"
	on:mouseenter={() => (show = true)}
	on:mouseleave={() => (show = false)}
>
	{#if color.label.type === 'qualitative'}
		<rect width={w} height={h} fill="white" stroke="gainsboro" />
		{#each Object.entries(color.label.val) as [dim, color], i}
			<g transform={`translate(5, ${15 * i + 5})`}>
				<rect width={10} height={10} fill={color} />
				<text x={15} y={5} font-size={10} dominant-baseline="middle">
					{dim}
				</text>
			</g>
		{/each}
	{/if}
</g>
