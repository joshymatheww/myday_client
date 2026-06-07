<script lang="ts">
	import DeleteModal from '$lib/components/ui/modals/DeleteModal.svelte';
	import { useDeleteExercise } from '$lib/composables/use-delete-exercise.svelte';
	import { getExerciseState } from '$lib/contexts/exercise-state.svelte';
	import Icon from '@iconify/svelte';
	import ExerciseCards from './ExerciseCards.svelte';
	import ExerciseTable from './ExerciseTable.svelte';

	type Props = {
		isModalOpen: boolean;
	};

	const exerciseState = getExerciseState();
	const deleteMuation = useDeleteExercise();
	const deleteTitle = 'Delete exercise?';
	const deleteDescription =
		'Are you sure you want to delete this exercise? This action cannot be undone.';

	let isDeleteModalOpen = $state(false);
	let isDeleting = $state(false);
	let { isModalOpen = $bindable(false) }: Props = $props();

	const onClose = () => {
		isDeleteModalOpen = false;
		isDeleting = false;
		exerciseState.resetSelected();
	};

	const onConfirm = () => {
		if (exerciseState.selectedExercise) {
			isDeleting = true;
			deleteMuation.mutate({ exerciseId: exerciseState.selectedExercise.id! });
			isDeleting = false;
			isDeleteModalOpen = false;
		}
	};

	$effect(() => {
		if (exerciseState.canDelete) {
			isDeleteModalOpen = true;
		}
	});
</script>

{#if exerciseState.allExercises && exerciseState.allExercises.length === 0}
	<div
		class="rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/10 p-12 text-center backdrop-blur-sm"
	>
		<div
			class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-500"
		>
			<Icon icon="mdi:dumbbell" class="h-6 w-6" />
		</div>
		<h3 class="text-base font-semibold text-neutral-300">No exercises added yet</h3>
		<p class="mx-auto mt-1 mb-6 max-w-xs text-xs text-neutral-500">
			Create your custom directory of workouts to track routines effortlessly.
		</p>
		<button
			onclick={() => (isModalOpen = true)}
			class="text-sm font-semibold text-sky-400 hover:underline">Get started now &rarr;</button
		>
	</div>
{:else}
	<ExerciseCards />
	<ExerciseTable />
{/if}

<DeleteModal
	isOpen={isDeleteModalOpen}
	{isDeleting}
	{onClose}
	{onConfirm}
	title={deleteTitle}
	description={deleteDescription}
/>
