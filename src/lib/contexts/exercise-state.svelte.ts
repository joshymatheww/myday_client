import { getContext, setContext } from 'svelte';
import type { Exercise } from '$lib/types/exercise';

export class ExerciseState {
	isFilterVisible = $state(false);
	searchQuery = $state('');
	selectedCategory = $state('');
	selectedEquipment = $state('');
	selectedDifficulty = $state('');
	allExercises = $state<Exercise[]>([]);
	selectedExercise = $state<Exercise | null>(null);
	canDelete = $state(false);
	canEdit = $state(false);

	filteredExercises = $derived.by(() => {
		return this.allExercises.filter((exercise) => {
			const matchesSearch = exercise.name.toLowerCase().includes(this.searchQuery.toLowerCase());

			const matchesCategory = !this.selectedCategory || exercise.category === this.selectedCategory;
			const matchesEquipment =
				!this.selectedEquipment || exercise.equipement === this.selectedEquipment;
			const matchesDifficulty =
				!this.selectedDifficulty || exercise.difficulty === this.selectedDifficulty;

			return matchesSearch && matchesCategory && matchesEquipment && matchesDifficulty;
		});
	});

	toggleFilters() {
		this.isFilterVisible = !this.isFilterVisible;
	}

	clearFilters() {
		this.searchQuery = '';
		this.selectedCategory = '';
		this.selectedEquipment = '';
		this.selectedDifficulty = '';
	}

	hasActiveFilters() {
		return !!(
			this.searchQuery ||
			this.selectedCategory ||
			this.selectedEquipment ||
			this.selectedDifficulty
		);
	}

	deleteExercise(exercise: Exercise) {
		this.selectedExercise = exercise;
		this.canDelete = true;
	}

	editExercise(exercise: Exercise) {
		this.selectedExercise = exercise;
		this.canEdit = true;
	}

	resetSelected() {
		this.selectedExercise = null;
		this.canDelete = false;
		this.canEdit = false;
	}
}

const EXERCISE_KEY = Symbol('EXERCISE_STATE');

export function setExerciseState() {
	return setContext(EXERCISE_KEY, new ExerciseState());
}

export function getExerciseState() {
	const context = getContext<ExerciseState>(EXERCISE_KEY);
	if (!context) {
		throw new Error(
			'getExerciseState must be consumed within an initialized Context provider hierarchy.'
		);
	}
	return context;
}
