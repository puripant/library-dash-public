<script lang="ts">
	import { range } from 'd3-array';
	import type { TColor } from 'src/utils/barcolors';

	export let w: number,
		h: number,
		margin: { top: number; right: number; bottom: number; left: number },
		color: TColor;

	let show = false;
</script>

{#if color.label.type === 'qualitative'}
	<g
		transform={`translate(${w - margin.right / 2 - (show ? w / 2 : -w * 0.3)}, ${margin.top / 2})`}
		opacity={0.95}
		class="transition-all"
		on:mouseenter={() => (show = true)}
		on:mouseleave={() => (show = false)}
	>
		<rect width={w} height={h} fill="white" stroke="gainsboro" />
		{#each Object.entries(color.label.val) as [dim, color], i}
			<g transform={`translate(5, ${15 * i + 5})`}>
				<rect width={10} height={10} fill={color} />
				<text x={15} y={5} font-size={10} dominant-baseline="middle">
					{dim}
				</text>
			</g>
		{/each}
	</g>
{/if}
{#if color.label.type === 'quantitative'}
	<g transform={`translate(${w - margin.right / 2 + 25}, ${margin.top / 2})`} opacity={0.95}>
		<rect width={50} height={h / 2} fill="white" stroke="gainsboro" />
		<g transform={`translate(5, 5)`} font-size={10}>
			{#each range(...color.label.val, (color.label.val[1] - color.label.val[0]) / ((h / 2 - 10) / 2)).reverse() as value, i}
				<g transform={`translate(0, ${2 * i})`}>
					<rect width={10} height={2} fill={color(value)} />
				</g>
			{/each}
			<text dominant-baseline="middle" x={15} y={5}> {color.label.val[1]} </text>
			<text dominant-baseline="middle" x={15} y={h / 2 - 15}> {color.label.val[0]} </text>
		</g>
	</g>
{/if}
