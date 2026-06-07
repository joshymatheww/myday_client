<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getDropdownState } from './context.svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
	const state = getDropdownState();
</script>

<button
	onclick={state.toggle}
	type="button"
	class="cursor-pointer border-0 bg-transparent p-0 text-left focus:outline-none"
>
	{@render children()}
</button>
