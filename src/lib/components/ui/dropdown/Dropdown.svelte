<script lang="ts">
	import type { Snippet } from 'svelte';
	import { DropdownState, setDropdownState } from './context.svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();

	const dropdownState = new DropdownState();

	setDropdownState(dropdownState);

	let container: HTMLDivElement;

	$effect(() => {
		dropdownState.setContainer(container);
	});
</script>

<div bind:this={container} class="relative inline-block text-left">
	{@render children()}
</div>
