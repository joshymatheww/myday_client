<script lang="ts">
	import Icon from '@iconify/svelte';

	type Props = {
		onClick: () => void;
	};

	let { onClick }: Props = $props();
</script>

<button
	type="button"
	onclick={onClick}
	class="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
	><Icon icon="mdi:close" class="h-5 w-5" /></button
>
