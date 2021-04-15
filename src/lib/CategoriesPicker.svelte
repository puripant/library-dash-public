<script>
	import { BASE_DIMENSIONS } from '../stores/basedim';
</script>

<div class="flex justify-center items-center h-full w-full">
	{#each Object.entries(BASE_DIMENSIONS) as [dim, title]}
		<a href={`/dashboard/${dim}`} class="cols">
			{title}
		</a>
	{/each}
</div>

<style style lang="postcss">
	.cols {
		font-family: inherit;
		font-size: inherit;
		/* Using Tailwind classes directly on your HTML elements is recommended over @apply. */
		@apply h-full;
		@apply w-1/5;
		@apply flex;
		@apply justify-center;
		@apply items-center;
		@apply border-2;
		@apply cursor-pointer;
	}

	.cols:hover {
		@apply bg-gradient-to-b;
		@apply from-green-400;
		@apply to-blue-500;
	}
</style>
