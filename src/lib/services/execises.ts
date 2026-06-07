import type { ApiResponse } from '$lib/types/app';
import type { Exercise } from '$lib/types/exercise';
import { apiFetch } from './api';

/**
 *
 * @returns Exercise []
 */
export const getAllExercises = async (): Promise<Exercise[]> => {
	const res = await apiFetch('/exercises');
	return res.json();
};

/**
 *
 * @param exercise
 * @returns Exercise
 */
export const saveExercise = async (exercise: Exercise): Promise<ApiResponse<Exercise>> => {
	const res = await apiFetch('/exercises', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(exercise)
	});
	return res.json();
};

/**
 *
 * @param exerciseId : string
 * @returns string
 */
export const deleteExercise = async (exerciseId: string) => {
	await apiFetch(`/exercises/${exerciseId}`, {
		method: 'DELETE'
	});
	return 'Sucessfully deleted the exercise details';
};
