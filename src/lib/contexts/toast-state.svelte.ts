import type { ToastStateType, ToastType } from '$lib/types/app';
import { getContext, onDestroy, setContext } from 'svelte';

export class ToastState {
	toasts = $state<ToastStateType[]>([]);
	toastToTimeoutMap = new Map<string, number>();

	constructor() {
		onDestroy(() => {
			for (const timeOut of this.toastToTimeoutMap.values()) {
				clearTimeout(timeOut);
			}
			this.toastToTimeoutMap.clear();
		});
	}

	addToast(title: string, message: string, type: ToastType, durationMs = 5000) {
		const id = crypto.randomUUID();
		this.toasts.push({
			id,
			title,
			message,
			type
		});

		this.toastToTimeoutMap.set(
			id,
			window.setTimeout(() => {
				this.removeToast(id);
			}, durationMs)
		);
	}

	removeToast(id: string) {
		const timeOut = this.toastToTimeoutMap.get(id);
		if (timeOut) {
			clearTimeout(timeOut);
			this.toastToTimeoutMap.delete(id);
		}
		this.toasts = this.toasts.filter((toast) => toast.id !== id);
	}
}

const TOAST_KEY = Symbol('TOAST');

export function setToastState() {
	return setContext(TOAST_KEY, new ToastState());
}

export function getToastState() {
	return getContext<ReturnType<typeof setToastState>>(TOAST_KEY);
}
