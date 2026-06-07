export type ExerciseCategory =
	| 'chest'
	| 'back'
	| 'shoulders'
	| 'legs'
	| 'biceps'
	| 'triceps'
	| 'core'
	| 'cardio'
	| 'fullbody';

export type ExerciseEquipement =
	| 'barbell'
	| 'dumbbell'
	| 'machine'
	| 'bodyweight'
	| 'kettlebell'
	| 'cable'
	| 'resistance_band'
	| 'smith_machine'
	| 'other';

export type ExerciseDifficulty = 'easy' | 'medium' | 'hard';

export type Exercise = {
	id?: string;
	name: string;
	category: ExerciseCategory;
	equipement: ExerciseEquipement;
	difficulty: ExerciseDifficulty;
	description?: string;
};
