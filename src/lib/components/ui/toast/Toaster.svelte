<script lang="ts">
	import { getToastState } from '$lib/contexts/toast-state.svelte';
	import Toast from './Toast.svelte';

	const toastState = getToastState();
	let currentToasts = $derived(toastState.toasts);

	const removeToast = (id: string) => {
		toastState.removeToast(id);
	};
</script>

<div
	class="pointer-events-none fixed top-4 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-3"
>
	{#each currentToasts as toast (toast.id)}
		<div class="pointer-events-auto">
			<Toast {toast} onClose={removeToast} />
		</div>
	{/each}
</div>
