<script lang="ts">
	import Icon from '@iconify/svelte';
	import UserDropdown from './UserDropdown.svelte';

	type Props = {
		isSidebarOpen: boolean;
	};

	let { isSidebarOpen = $bindable(false) }: Props = $props();
</script>

<header class="border-b border-neutral-800 bg-neutral-900/50 px-6 py-3 backdrop-blur-md">
	<div class="flex items-center justify-between gap-4">
		<button
			onclick={() => (isSidebarOpen = !isSidebarOpen)}
			class="flex items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 p-2 text-neutral-300 transition-colors hover:text-white lg:hidden"
		>
			<Icon icon="mdi:menu" class="h-5 w-5" />
		</button>

		<div class="relative hidden max-w-md flex-1 items-center sm:flex">
			<Icon icon="mdi:magnify" class="absolute left-3 h-5 w-5 text-neutral-500" />
			<input
				type="text"
				id="search"
				name="search"
				placeholder="Search anything..."
				class="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-2 pr-4 pl-10 text-sm text-neutral-200 placeholder-neutral-500 transition-all focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 focus:outline-none"
			/>
		</div>

		<UserDropdown />
	</div>
</header>
