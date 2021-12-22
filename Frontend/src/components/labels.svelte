<script lang="ts">
	import { range } from 'd3-array';
	import type { TColor } from 'src/utils/barcolors';

	export let w: number,
		h: number,
		margin: { top: number; right: number; bottom: number; left: number },
		color: TColor,
		title;

	let show = false;
</script>

<!-- style={`translate(${w - margin.right / 2 - (show ? w / 2 : -w * 0.3)}, ${margin.top / 2})`} -->
<!-- opacity={0.95} -->
<!-- <h2 x={5} y={10} dominant-baseline="middle" font-size={10}> {title} </h2> -->

<div class="transition-all" style={`transform: translateX(${show ? '0%' : '100%'});`}>
	<div
		class="absolute left-0 top-0 -translate-x-full p-1 bg-gray-400 text-white cursor-pointer text-xs"
		on:click={() => (show = !show)}
	>
		{show ? 'x' : 'label'}
	</div>
	{#if color.label.type === 'qualitative'}
		<div class="bg-white border-2 border-gray-400 w-40 max-h-60 p-2 overflow-auto flex flex-col">
			<h2 class="text-sm">{title}</h2>
			{#each Object.entries(color.label.val) as [dim, color], i}
				<div class="flex items-center justify-start">
					<div class="h-3 pr-3 mr-1" style={`background-color: ${color};`} />
					<p class="text-xs whitespace-nowrap">{dim}</p>
					<!-- <text x={15} y={6.75} font-size={10} dominant-baseline="middle">
						{dim}
					</text> -->
				</div>
			{/each}
		</div>
	{/if}
	{#if color.label.type === 'quantitative'}
		<svg width={65} height={h}>
			<g opacity={0.95}>
				<rect width={65} height={h / 2 + 15} fill="white" stroke="gainsboro" />
				<text x={5} y={10} dominant-baseline="middle" font-size={10}> {title} </text>
				<g transform={`translate(5, 20)`} font-size={10}>
					{#each range(...color.label.val, (color.label.val[1] - color.label.val[0]) / ((h / 2 - 10) / 2)).reverse() as value, i}
						<g transform={`translate(0, ${2 * i})`}>
							<rect width={10} height={2} fill={color(value)} />
						</g>
					{/each}
					<text dominant-baseline="middle" x={15} y={5}> {color.label.val[1]} </text>
					<text dominant-baseline="middle" x={15} y={h / 2 - 15}> {color.label.val[0]} </text>
				</g>
			</g>
		</svg>
	{/if}
</div>
