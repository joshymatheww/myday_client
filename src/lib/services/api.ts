import { goto } from '$app/navigation';
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { ApiErrorResponse } from '$lib/types/app';

export class ApiError extends Error {
	constructor(
		public status: number,
		public response: ApiErrorResponse
	) {
		super(typeof response.error === 'string' ? response.error : 'Validation failed');
		this.name = 'ApiError';
	}
}

export async function apiFetch(url: string, options: RequestInit = {}) {
	options.headers = {
		...options.headers,
		'Content-Type': 'application/json'
	};

	options.credentials = 'include';

	let response = await fetch(`${PUBLIC_API_BASE_URL}${url}`, options);

	if (response.status === 401) {
		try {
			const refreshRes = await fetch(`${PUBLIC_API_BASE_URL}/auth/refresh`, {
				method: 'POST',
				credentials: 'include'
			});
			if (refreshRes.ok) {
				response = await fetch(`${PUBLIC_API_BASE_URL}${url}`, options);
			} else {
				handleSessionExpiry();
			}
		} catch (error) {
			handleSessionExpiry();
		}
	}

	if (response.ok) {
		return response;
	}

	let errorResponse: ApiErrorResponse = {
		success: false,
		error: 'Unknown error'
	};

	try {
		errorResponse = await response.json();
	} catch {
		// Ignore invalid JSON responses
	}

	throw new ApiError(response.status, errorResponse);
}

const handleSessionExpiry = () => {
	if (typeof window !== 'undefined') {
		window.location.href = '/auth/login';
	}
};
