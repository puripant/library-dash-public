<script>
	import { createEventDispatcher } from 'svelte';

	import Barchart from '../components/barchart.svelte';

	export let data, dim, name;

	const dispatch = createEventDispatcher();

	function forward(event) {
		dispatch('filter', event.detail);
	}

	function removeEvent() {
		dispatch('remove');
	}
</script>

<div class="w-full h-full border-2 border-black flex flex-col">
	<div id="top-bar" class="w-full flex bg-gray-200 px-2">
		<span on:pointerdown={(e) => e.stopPropagation()} on:click={removeEvent} class="remove">
			✕
		</span>
		<div on:pointerdown={(e) => dispatch('move', e)} class="flex-1 cursor-pointer" />
	</div>
	<div class="flex-1">
		<Barchart {data} {dim} {name} on:filter={forward} />
	</div>
</div>
