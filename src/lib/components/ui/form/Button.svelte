<script lang="ts">
	import type { ButtonProps } from '$lib/types/form';

	let {
		text,
		type = 'submit',
		disabled = false,
		isLoading = false,
		onClick
	}: ButtonProps = $props();

	let btnClass = $derived.by(() => {
		if (type === 'submit') {
			return 'flex-1 rounded-xl bg-linear-to-r from-sky-500 to-indigo-600 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-95';
		}
		if (type === 'button') {
			return 'flex-1 rounded-xl border border-neutral-800 bg-neutral-950 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:text-white';
		}
	});
</script>

<button {type} {disabled} onclick={onClick} class={btnClass}>
	{#if isLoading}
		Sending...
	{:else}
		{text}
	{/if}
</button>
