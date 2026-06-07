import type { AppOptions } from '$lib/types/app';

export const OPTIONS: AppOptions = {
	exercise_categories: [
		{ value: 'chest', label: 'Chest' },
		{ value: 'back', label: 'Back' },
		{ value: 'shoulders', label: 'Shoulders' },
		{ value: 'legs', label: 'Legs' },
		{ value: 'biceps', label: 'Biceps' },
		{ value: 'triceps', label: 'Triceps' },
		{ value: 'core', label: 'Core' },
		{ value: 'cardio', label: 'cardio' },
		{ value: 'fullbody', label: 'Full Body' }
	],
	exercise_equipements: [
		{ value: 'barbell', label: 'Barbell' },
		{ value: 'dumbbell', label: 'Dumbbell' },
		{ value: 'machine', label: 'Machine' },
		{ value: 'bodyweight', label: 'Bodyweight' },
		{ value: 'kettlebell', label: 'Kettlebell' },
		{ value: 'cable', label: 'Cable' },
		{ value: 'resistance_band', label: 'Band' },
		{ value: 'smith_machine', label: 'Smith Machine' },
		{ value: 'other', label: 'Other' }
	],
	exercise_difficulties: [
		{ value: 'easy', label: 'Easy' },
		{ value: 'medium', label: 'Medium' },
		{ value: 'hard', label: 'Hard' }
	]
};
