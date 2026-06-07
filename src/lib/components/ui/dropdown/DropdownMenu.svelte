<script lang="ts">
	import type { Snippet } from 'svelte';
	import { scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { getDropdownState } from './context.svelte';

	type Props = {
		align?: 'left' | 'right';
		children: Snippet;
	};

	let { align = 'right', children }: Props = $props();

	const state = getDropdownState();

	function handleWindowClick(event: MouseEvent) {
		const target = event.target as Node;

		if (state.isOpen && state.container && !state.container.contains(target)) {
			state.close();
		}
	}
</script>

<svelte:window onclick={handleWindowClick} />

{#if state.isOpen}
	<div
		transition:scale={{ duration: 150, start: 0.95, easing: cubicOut }}
		class={`absolute ${
			align === 'right' ? 'right-0' : 'left-0'
		} z-40 mt-2 w-52 origin-top-right rounded-xl border border-neutral-800 bg-neutral-900/95 p-1.5 shadow-xl backdrop-blur-xl`}
		role="menu"
	>
		<ul class="m-0 list-none space-y-0.5 p-0">
			{@render children()}
		</ul>
	</div>
{/if}
