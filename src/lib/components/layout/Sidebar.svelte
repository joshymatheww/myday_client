<script lang="ts">
	import { resolve } from '$app/paths';
	import Icon from '@iconify/svelte';
	import SidebarGroup from './SidebarGroup.svelte';
	import { FIANANCE_MENUS, FITNESS_MENUS } from '$lib/utils/menus';
	import { page } from '$app/state';

	type Props = {
		isSidebarOpen: boolean;
	};

	let { isSidebarOpen = $bindable(false) }: Props = $props();
</script>

{#if isSidebarOpen}
	<button
		onclick={() => (isSidebarOpen = false)}
		class="fixed inset-0 z-40 block h-full w-full cursor-default border-0 bg-black/60 p-0 backdrop-blur-sm lg:hidden"
		aria-label="Close sidebar"
	></button>
{/if}

<aside
	class={`
	fixed inset-y-0 left-0 z-50 flex w-65 flex-col justify-between border-r border-neutral-800 bg-neutral-900 p-5 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
	${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
`}
>
	<div class="no-scrollbar flex flex-1 flex-col overflow-y-auto">
		<div class="mb-2 flex items-center justify-between">
			<a
				onclick={() => (isSidebarOpen = false)}
				href={resolve('/app')}
				class="flex items-center gap-3 py-2"
			>
				<div class="rounded-xl border border-sky-500/20 bg-sky-500/10 p-2">
					<Icon icon="mdi:calendar-today-outline" class="h-5 w-5 text-sky-400" />
				</div>
				<span
					class="bg-linear-to-r from-white to-neutral-400 bg-clip-text text-lg font-bold tracking-wider text-transparent"
					>MY DAY</span
				>
			</a>

			<button
				onclick={() => (isSidebarOpen = false)}
				class="rounded-lg p-1 text-neutral-400 hover:bg-neutral-800 lg:hidden"
			>
				<Icon icon="mdi:close" class="h-5 w-5" />
			</button>
		</div>

		<div class="space-y-1">
			<SidebarGroup
				title={FIANANCE_MENUS.title}
				items={FIANANCE_MENUS.items}
				onLinkClick={() => (isSidebarOpen = false)}
			/>
			<SidebarGroup
				title={FITNESS_MENUS.title}
				items={FITNESS_MENUS.items}
				onLinkClick={() => (isSidebarOpen = false)}
			/>
		</div>
	</div>

	<div class="mt-4 border-t border-neutral-800 pt-4">
		<a
			onclick={() => (isSidebarOpen = false)}
			href={resolve('/app/settings')}
			class={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
				${
					page.url.pathname === '/app/settings'
						? 'border border-sky-500/20 bg-linear-to-r from-sky-500/10 to-indigo-500/10 text-sky-400'
						: 'text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-200'
				}`}
		>
			<Icon icon="mdi:settings-outline" class="h-5 w-5" />
			<span>Settings</span>
		</a>
	</div>
</aside>

<style>
	/* Hides sidebar scrollbars cleanly */
	:global(.no-scrollbar::-webkit-scrollbar) {
		display: none;
	}
	:global(.no-scrollbar) {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
