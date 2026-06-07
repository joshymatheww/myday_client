<script lang="ts">
	import type { TextAreaProps } from '$lib/types/form';

	let { id, label, name, error, placeholder, required = false }: TextAreaProps = $props();
	$inspect(error);
</script>

<div class="space-y-1.5">
	<label for={id} class="text-xs font-semibold tracking-wider text-neutral-400 uppercase"
		>{label}</label
	>
	<textarea
		{id}
		rows="4"
		{name}
		{placeholder}
		{required}
		class="w-full resize-none rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white focus:border-sky-500/50 focus:outline-none"
	></textarea>

	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
