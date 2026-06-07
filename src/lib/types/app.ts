import type { SelectOption } from './form';

export type AppOptions = {
	exercise_categories: SelectOption[];
	exercise_equipements: SelectOption[];
	exercise_difficulties: SelectOption[];
};

export type ToastType = 'success' | 'error' | 'warning';

export type ToastStateType = {
	id: string;
	title: string;
	message: string;
	type: ToastType;
};

// A generic wrapper where T represents the shape of the successful data payload
export type ApiResponse<T> =
	| { success: true; data: T; error?: never; validationErrors?: never; message?: never }
	| { success: false; error: true; validationErrors: any[]; data?: never; message?: never }
	| { success: false; error: true; message: string; data?: never; validationErrors?: never };

export interface ApiValidationError {
	origin: string;
	code: string;
	path: string[];
	message: string;
}

export interface ApiErrorResponse {
	success: false;
	error: ApiValidationError[] | string;
	data?: unknown;
}

export type DeleteModalProps = {
	isOpen: boolean;
	isDeleting?: boolean;
	title?: string;
	description?: string;
	onClose: () => void;
	onConfirm: () => void;
};
