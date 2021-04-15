<script>
	import { page } from '$app/stores';

	const {
		params: { basedim }
	} = $page;
</script>

<main class="w-screen h-screen">
	<nav>
		<h1>{basedim}</h1>
	</nav>
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
