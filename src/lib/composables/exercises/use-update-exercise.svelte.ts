import { getToastState } from '$lib/contexts/toast-state.svelte';
import { ApiError } from '$lib/services/api';
import { updateExercise } from '$lib/services/execises';
import type { Exercise } from '$lib/types/exercise';
import { getFieldErrors } from '$lib/utils/functions';
import { createMutation, useQueryClient } from '@tanstack/svelte-query';

type Options = {
	onError?: (error: Record<string, string>) => void;
	onSuccess?: () => void;
};

export function useUpdateExercise(options?: Options) {
	const queryClient = useQueryClient();
	const toastState = getToastState();

	const updateMutation = createMutation(() => ({
		mutationFn: ({ name, category, equipement, difficulty, description, id }: Exercise) =>
			updateExercise({ name, category, equipement, difficulty, description, id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['exercises'] });
			toastState.addToast('Success', 'Successfully update exercise details.', 'success');
			options?.onSuccess?.();
		},
		onError: (error) => {
			toastState.addToast('Error', error.message, 'error');
			if (error instanceof ApiError) {
				if (error.status === 400) {
					options?.onError?.(getFieldErrors(error));
				}
			}
		}
	}));

	return updateMutation;
}
