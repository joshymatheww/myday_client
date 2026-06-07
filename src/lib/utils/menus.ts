import type { Menu } from '$lib/types/menu';

export const FIANANCE_MENUS: Menu = {
	title: 'Fianance Tracker',
	items: [
		{ href: '/app/transactions', icon: 'mdi:cash-fast', label: 'Transactions' },
		{ href: '/app/reports', icon: 'mdi:chart-finance', label: 'Reports' },
		{ href: '/app/accounts', icon: 'mdi:bank', label: 'Accounts' },
		{ href: '/app/categories', icon: 'mdi:category', label: 'Categories' },
		{ href: '/app/payment-methods', icon: 'mdi:payment', label: 'Payment Methods' }
	]
};
export const FITNESS_MENUS: Menu = {
	title: 'Fitness Tracker',
	items: [
		{ href: '/app/plans', icon: 'mdi:calendar-plus', label: 'Plans' },
		{ href: '/app/exercises', icon: 'mdi:gym', label: 'Exercises' },
		{ href: '/app/workouts', icon: 'mdi:gymnastics', label: 'Workouts' }
	]
};
