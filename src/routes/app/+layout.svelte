<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import { setUserState } from '$lib/contexts/user-state.svelte';
	import { getMe } from '$lib/services/auth.js';
	import { createQuery } from '@tanstack/svelte-query';

	let { children } = $props();
	let isSidebarOpen = $state(false);

	const userState = setUserState();

	const userQuery = createQuery(() => ({
		queryKey: ['auth-user'],
		queryFn: () => getMe(),
		retry: false
	}));

	$effect(() => {
		if (userQuery.data) {
			userState.addUser(userQuery.data);
		}
	});
</script>

<div
	class="relative grid h-screen w-full grid-cols-1 overflow-hidden bg-neutral-950 text-neutral-100 lg:grid-cols-[260px_1fr]"
>
	<div
		class="pointer-events-none absolute top-[-20%] right-[-10%] z-0 h-150 w-150 rounded-full bg-sky-500/5 blur-[130px]"
	></div>
	<div
		class="pointer-events-none absolute bottom-[-10%] left-[20%] z-0 h-125 w-125 rounded-full bg-indigo-500/5 blur-[130px]"
	></div>

	<Sidebar bind:isSidebarOpen />

	<main class="relative z-10 flex h-full flex-col overflow-hidden">
		<Header bind:isSidebarOpen />

		<div class="flex-1 overflow-y-auto p-6">
			{@render children()}
		</div>
	</main>
</div>
