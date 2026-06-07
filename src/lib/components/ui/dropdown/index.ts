// $lib/components/ui/dropdown/index.ts
import Root from './Dropdown.svelte';
import Trigger from './DropdownTrigger.svelte';
import Menu from './DropdownMenu.svelte';
import Item from './DropdownItem.svelte';

export const Dropdown = Object.assign(Root, {
	Trigger,
	Menu,
	Item
});
