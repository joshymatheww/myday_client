<script lang="ts">
	import Button from '$lib/components/ui/form/Button.svelte';
	import Input from '$lib/components/ui/form/Input.svelte';
	import RadioButtons from '$lib/components/ui/form/RadioButtons.svelte';
	import Select from '$lib/components/ui/form/Select.svelte';
	import Textarea from '$lib/components/ui/form/Textarea.svelte';
	import CloseButton from '$lib/components/ui/modals/CloseButton.svelte';
	import { getExerciseState } from '$lib/contexts/exercise-state.svelte';
	import { getToastState } from '$lib/contexts/toast-state.svelte';
	import { ApiError } from '$lib/services/api';
	import { saveExercise } from '$lib/services/execises';
	import type {
		Exercise,
		ExerciseCategory,
		ExerciseDifficulty,
		ExerciseEquipement
	} from '$lib/types/exercise';
	import { getFieldError, getFieldErrors } from '$lib/utils/functions';
	import { OPTIONS } from '$lib/utils/options';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';

	type Props = {
		isModalOpen: boolean;
	};

	const toastState = getToastState();
	const queryClient = useQueryClient();
	const exerciseState = getExerciseState();

	let { isModalOpen = $bindable(false) }: Props = $props();

	let editingId = $state<string | null>(null);
	let isSubmitting = $state(false);
	let formErrors = $state<Record<string, string>>({});

	let action = $derived.by(() => (exerciseState.selectedExercise ? '?/edit' : '?/save'));

	const exerciseMutation = createMutation(() => ({
		mutationFn: ({ name, category, equipement, difficulty, description }: Exercise) =>
			saveExercise({ name, category, equipement, difficulty, description }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['exercises'] });
			isSubmitting = false;
			isModalOpen = false;
			toastState.addToast('Success', 'Successfully saved exercise details.', 'success');
		},
		onError: (error) => {
			isSubmitting = false;
			if (error instanceof ApiError) {
				if (error.status === 400) {
					formErrors = getFieldErrors(error);
				}
			}
			toastState.addToast('Error', error.message, 'error');
		}
	}));

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		isSubmitting = true;
		const formElement = e.currentTarget as HTMLFormElement;
		const formData = new FormData(formElement);

		const name = formData.get('name') as string;
		const category = formData.get('category') as ExerciseCategory;
		const equipement = formData.get('equipement') as ExerciseEquipement;
		const difficulty = formData.get('difficulty') as ExerciseDifficulty;
		const description = formData.get('description') as string;

		exerciseMutation.mutate({ name, category, equipement, difficulty, description });
	};

	$effect(() => {
		return () => {
			if (!isModalOpen) {
				formErrors = {};
			}
		};
	});
</script>

<form class="flex-1 space-y-5" method="POST" {action} onsubmit={handleSubmit}>
	<div class="flex items-center justify-between border-b border-neutral-800 pb-4">
		<h2 class="text-lg font-bold text-white">
			{exerciseState.selectedExercise ? 'Modify Exercise' : 'Register New Exercise'}
		</h2>
		<CloseButton onClick={() => (isModalOpen = false)} />
	</div>

	<Input
		name="name"
		id="name"
		label="Exercise Title"
		placeholder="e.g., Incline Dumbbell Press"
		error={getFieldError(formErrors, 'name') ?? ''}
		value={exerciseState.selectedExercise ? exerciseState.selectedExercise.name : ''}
	/>

	<div class="grid grid-cols-2 gap-4">
		<Select
			name="category"
			id="category"
			label="Target Category"
			options={OPTIONS.exercise_categories}
			value={exerciseState.selectedExercise ? exerciseState.selectedExercise.category : ''}
		/>

		<Select
			name="equipement"
			id="equipement"
			label="Equipement Type"
			options={OPTIONS.exercise_equipements}
			value={exerciseState.selectedExercise ? exerciseState.selectedExercise.equipement : ''}
		/>
	</div>

	<RadioButtons
		label="Difficulty Level"
		name="difficulty"
		options={OPTIONS.exercise_difficulties}
		defaultValue="easy"
		selectedValue={exerciseState.selectedExercise
			? exerciseState.selectedExercise.difficulty
			: 'easy'}
	/>

	<Textarea
		label="Execution / Notes (Optional)"
		id="description"
		name="description"
		placeholder="Keep shoulder blades retracted, lower down to a 90-degree angle..."
		error={getFieldError(formErrors, 'description') ?? ''}
		value={exerciseState.selectedExercise ? exerciseState.selectedExercise.description : ''}
	/>

	<div class="mt-auto flex items-center gap-3 border-t border-neutral-800 pt-6">
		<Button type="button" onClick={() => (isModalOpen = false)} text="Cancel" />

		<Button
			type="submit"
			text={editingId ? 'Save Changes' : 'Confirm Entry'}
			disabled={isSubmitting}
			isLoading={isSubmitting}
		/>
	</div>
</form>
