<script lang="ts">
	import type { InputProps } from '$lib/types/form';

	let {
		id,
		label,
		name,
		value,
		placeholder,
		error,
		type = 'text',
		required = false
	}: InputProps = $props();
</script>

<div class="space-y-1.5">
	<label for={id} class="text-xs font-semibold tracking-wider text-neutral-400 uppercase"
		>{label}</label
	>
	<input
		{type}
		{id}
		{name}
		{required}
		{placeholder}
		{value}
		class="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white focus:border-sky-500/50 focus:outline-none"
	/>

	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
