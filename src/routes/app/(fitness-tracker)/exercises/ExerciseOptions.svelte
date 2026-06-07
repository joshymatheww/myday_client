<script lang="ts">
	import { getExerciseState } from '$lib/contexts/exercise-state.svelte';
	import type { Exercise } from '$lib/types/exercise';
	import Icon from '@iconify/svelte';

	type Props = {
		selectedExercise: Exercise;
	};

	const exerciseState = getExerciseState();

	let { selectedExercise }: Props = $props();

	const handleDelete = () => exerciseState.deleteExercise(selectedExercise);

	const handleEdit = () => exerciseState.editExercise(selectedExercise);
</script>

<button
	onclick={handleEdit}
	class="rounded-lg p-1.5 text-neutral-400 transition-all hover:bg-neutral-800 hover:text-white"
>
	<Icon icon="mdi:pencil-outline" class="h-4 w-4" />
</button>
<button
	type="button"
	onclick={handleDelete}
	class="rounded-lg p-1.5 text-neutral-400 transition-all hover:bg-red-500/10 hover:text-red-400"
>
	<Icon icon="mdi:trash-can-outline" class="h-4 w-4" />
</button>
