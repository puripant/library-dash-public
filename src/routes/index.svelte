<script>
	import Counter from '$lib/CategoriesPicker.svelte';
</script>

<svelte:head>
	<title>Hello world!</title>
</svelte:head>

<main class="w-screen h-screen">
	<h1>Library Dash</h1>
	<div class="w-full h-full">
		<Counter />
	</div>
</main>

<style style lang="postcss">
	h1 {
		@apply text-red-600;
		@apply uppercase;
		@apply text-6xl;
		@apply font-thin;
		@apply leading-tight;
		@apply my-16 mx-auto;
		@apply max-w-xl;
		@apply text-center;
		@apply absolute;
		@apply top-10;
		@apply left-1/2;
		@apply transform;
		@apply -translate-x-1/2;
		@apply -translate-y-1/2;
	}
</style>
