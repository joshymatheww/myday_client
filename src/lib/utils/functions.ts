import type { ApiError } from '$lib/services/api';

export function getFieldError(errors: Record<string, string>, field: string): string | null {
	return errors[field] ?? null;
}

export function getFieldErrors(error: ApiError): Record<string, string> {
	if (!Array.isArray(error.response.error)) {
		return {};
	}

	return error.response.error.reduce(
		(acc, current) => {
			const field = current.path[0];

			if (field) {
				acc[field] = current.message;
			}

			return acc;
		},
		{} as Record<string, string>
	);
}
