<script lang="ts">
	import Button from '$lib/components/ui/form/Button.svelte';
	import Input from '$lib/components/ui/form/Input.svelte';
	import RadioButtons from '$lib/components/ui/form/RadioButtons.svelte';
	import Select from '$lib/components/ui/form/Select.svelte';
	import Textarea from '$lib/components/ui/form/Textarea.svelte';
	import CloseButton from '$lib/components/ui/modals/CloseButton.svelte';
	import { useCreateExercise } from '$lib/composables/exercises/use-create-exercise.svelte';
	import { useUpdateExercise } from '$lib/composables/exercises/use-update-exercise.svelte';
	import { getExerciseState } from '$lib/contexts/exercise-state.svelte';

	import type {
		ExerciseCategory,
		ExerciseDifficulty,
		ExerciseEquipement
	} from '$lib/types/exercise';
	import { getFieldError } from '$lib/utils/functions';
	import { OPTIONS } from '$lib/utils/options';

	type Props = {
		isModalOpen: boolean;
	};

	const exerciseState = getExerciseState();

	let { isModalOpen = $bindable(false) }: Props = $props();

	let isSubmitting = $state(false);
	let formErrors = $state<Record<string, string>>({});

	let action = $derived.by(() => (exerciseState.selectedExercise ? '?/edit' : '?/save'));

	const saveMutation = useCreateExercise({
		onError: (err) => (formErrors = err),
		onSuccess: () => {
			isSubmitting = false;
			isModalOpen = false;
		}
	});

	const updateMutation = useUpdateExercise({
		onError: (err) => (formErrors = err),
		onSuccess: () => {
			isSubmitting = false;
			isModalOpen = false;
		}
	});

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

		if (exerciseState.selectedExercise) {
			updateMutation.mutate({
				name,
				category,
				equipement,
				difficulty,
				description,
				id: exerciseState.selectedExercise.id
			});
		} else {
			saveMutation.mutate({ name, category, equipement, difficulty, description });
		}
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
			text={exerciseState.selectedExercise ? 'Save Changes' : 'Confirm Entry'}
			disabled={isSubmitting}
			isLoading={isSubmitting}
		/>
	</div>
</form>
