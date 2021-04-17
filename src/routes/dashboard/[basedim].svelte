<script>
	import { onMount } from 'svelte';

	import * as d3 from 'd3';

	import { page } from '$app/stores';

	const {
		params: { basedim }
	} = $page;

	let data = [];

	onMount(async () => {
		data = await d3.json('/data/data.json');
	});
</script>

<main class="w-screen h-screen flex flex-row">
	<nav>
		<h1>{basedim}</h1>
	</nav>
	<div id="visualise" class="flex-1 p-4 max-h-screen overflow-y-auto">
		{#each data as d}
			<div>
				{d.basedim}
			</div>
		{/each}
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
