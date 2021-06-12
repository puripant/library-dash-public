<script>
	import Barchart from '../components/barchart.svelte';

	export let onRemove, movePointerDown, data, dim;
</script>

<div class="w-full h-full border-2 border-black flex flex-col">
	<div id="top-bar" class="w-full flex bg-gray-200 px-2">
		<span on:pointerdown={(e) => e.stopPropagation()} on:click={onRemove} class="remove"> ✕ </span>
		<div on:pointerdown={movePointerDown} class="flex-1 cursor-pointer" />
	</div>
	<div class="flex-1">
		<Barchart {data} {dim} />
	</div>
</div>
