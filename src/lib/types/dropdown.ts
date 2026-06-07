import type { Snippet } from 'svelte';
import type { Pathname } from '$app/types';

export type DropdownContext = {
	isOpen: boolean;
	toggle: () => void;
	close: () => void;
};

export type DropdownItemProps = {
	href?: Pathname;
	danger?: boolean;
	onclick?: () => void;
	children: Snippet;
};

export type DropdownMenuProps = {
	align?: 'left' | 'right';
	children: Snippet;
};
