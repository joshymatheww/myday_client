import type { Pathname } from '$app/types';

export type MenuItem = {
	label: string;
	href: Pathname;
	icon: string;
};

export type Menu = {
	title: string;
	items: MenuItem[];
};
