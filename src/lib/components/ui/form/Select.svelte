<script lang="ts">
	import type { SelectProps } from '$lib/types/form';

	let {
		id,
		label,
		name,
		value,
		options,
		error,
		placeholder,
		required = false
	}: SelectProps = $props();
</script>

<div class="space-y-1.5">
	<label for={id} class="text-xs font-semibold tracking-wider text-neutral-400 uppercase"
		>{label}</label
	>
	<select
		{id}
		{name}
		{required}
		class="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-sm text-neutral-200 focus:border-sky-500/50 focus:outline-none"
	>
		{#if placeholder}
			<option value="">{placeholder}</option>
		{/if}

		{#each options as option (option.value)}
			<option value={option.value} selected={option.value === value}>{option.label}</option>
		{/each}
	</select>

	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
