import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { AuthUser, LogoutResponse, TokenResponse } from '$lib/types/auth';
import { apiFetch } from './api';

/**
 *
 * @param email
 * @param password
 * @returns token
 */
export const authetincateUser = async (email: string, password: string): Promise<TokenResponse> => {
	try {
		const res = await fetch(`${PUBLIC_API_BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});
		return await res.json();
	} catch (error) {
		throw Error('Error while making the login');
	}
};

/**
 *
 * @param token
 * @returns Auth user object
 */

export const getMe = async (): Promise<AuthUser> => {
	const res = await apiFetch('/auth/me');
	return res.json();
};

/**
 * Logout
 * @param none
 * @returns string
 */

export const logout = async (): Promise<LogoutResponse> => {
	const res = await apiFetch('/auth/logout', { method: 'POST' });
	return res.json();
};
