<script lang="ts">
	import { resolve } from '$app/paths';
	import { getDropdownState } from './context.svelte';
	import type { DropdownItemProps } from '$lib/types/dropdown';

	let { href, danger = false, onclick, children }: DropdownItemProps = $props();
	const state = getDropdownState();

	function handleClick() {
		onclick?.();
		state.close(); // Close menu automatically on click execution
	}
</script>

<li>
	{#if href}
		<a
			href={resolve(href)}
			onclick={state.close}
			class={`decoration-none flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
				${danger ? 'text-red-400 hover:bg-red-500/10' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'}`}
			role="menuitem"
		>
			{@render children()}
		</a>
	{:else}
		<button
			type="button"
			onclick={handleClick}
			class={`flex w-full cursor-pointer items-center gap-3 rounded-lg border-0 bg-transparent px-3 py-2 text-left text-sm font-medium transition-colors
				${danger ? 'text-red-400 hover:bg-red-500/10' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'}`}
			role="menuitem"
		>
			{@render children()}
		</button>
	{/if}
</li>
