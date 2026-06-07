import { getContext, setContext } from 'svelte';

export class DropdownState {
	isOpen = $state(false);

	container: HTMLElement | null = null;

	setContainer = (node: HTMLElement) => {
		this.container = node;
	};

	toggle = () => {
		this.isOpen = !this.isOpen;
	};

	close = () => {
		this.isOpen = false;
	};
}

const KEY = Symbol('dropdown-context');

export function setDropdownState(state: DropdownState) {
	setContext(KEY, state);
}

export function getDropdownState() {
	return getContext<DropdownState>(KEY);
}
