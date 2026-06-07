<script lang="ts">
	import type { OptionButtonsProps } from '$lib/types/form';

	let { label, name, options, defaultValue, selectedValue }: OptionButtonsProps = $props();

	let control = $derived.by(() => {
		if (defaultValue) {
			return defaultValue;
		} else if (selectedValue) {
			return selectedValue;
		} else {
			('');
		}
	});
</script>

<div class="space-y-2">
	<span class="block text-xs font-semibold tracking-wider text-neutral-400 uppercase">{label}</span>
	<input type="hidden" bind:value={control} {name} />
	<div class="grid grid-cols-3 gap-2">
		{#each options as option}
			<button
				type="button"
				onclick={() => (control = option.value)}
				class={`rounded-xl border py-2 text-xs font-medium capitalize transition-all ${control === option.value ? 'border-sky-500 bg-sky-500/10 text-sky-400' : 'border-neutral-800 bg-neutral-950 text-neutral-400'}`}
			>
				{option.label}
			</button>
		{/each}
	</div>
</div>
