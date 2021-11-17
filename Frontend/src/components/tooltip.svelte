<script lang="ts">
	import { tooltip } from './tooltip.store';
</script>

{#if $tooltip}
	<div
		style={`position: fixed; top: ${$tooltip.top}px; left: ${
			$tooltip.left + 20
		}px; z-index: 999; transform: translate(0, -50%)`}
		class="bg-blue-400 text-white p-2 rounded pointer-events-none"
	>
		<div class="text-sm flex flex-col">
			<div>
				{$tooltip.xDim}: {$tooltip.xDatum}
			</div>
			<div>
				{$tooltip.stackDim}: {$tooltip.stackDatum}
			</div>
			<div>
				จำนวน: {$tooltip.count}
			</div>
		</div>
	</div>
{/if}
