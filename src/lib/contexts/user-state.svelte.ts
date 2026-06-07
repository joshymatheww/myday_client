import type { AuthUser } from '$lib/types/auth';
import { getContext, setContext } from 'svelte';

export class UserState {
	authUser = $state<AuthUser | null>(null);

	addUser(user: AuthUser) {
		this.authUser = user;
	}

	removeUser() {
		this.authUser = null;
	}
}

const USER_KEY = Symbol('USER');

export function setUserState() {
	return setContext(USER_KEY, new UserState());
}

export function getUserState() {
	return getContext<ReturnType<typeof setUserState>>(USER_KEY);
}
