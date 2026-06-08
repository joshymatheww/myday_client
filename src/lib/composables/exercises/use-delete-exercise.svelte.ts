import { getToastState } from '$lib/contexts/toast-state.svelte';
import { deleteExercise } from '$lib/services/execises';
import { createMutation, useQueryClient } from '@tanstack/svelte-query';

export function useDeleteExercise() {
	const queryClient = useQueryClient();
	const toastState = getToastState();

	const deleteMuation = createMutation(() => ({
		mutationFn: ({ exerciseId }: { exerciseId: string }) => deleteExercise(exerciseId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['exercises'] });
			toastState.addToast('Success', 'Successfully deleted the exercise details.', 'success');
		},
		onError: (error: any) => {
			toastState.addToast('Error', error.message, 'error');
		}
	}));

	return deleteMuation;
}
