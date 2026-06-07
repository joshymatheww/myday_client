<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Dropdown } from '../ui/dropdown';
	import { getUserState } from '$lib/contexts/user-state.svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import { logout } from '$lib/services/auth';
	import { goto } from '$app/navigation';

	const userState = getUserState();

	const user = $derived(userState.authUser);

	const logoutMutation = createMutation(() => ({
		mutationFn: () => logout(),
		onSuccess: () => {
			goto('/auth/login');
		}
	}));

	const getNameAvatar = (name: string) => {
		return name
			.split(' ')
			.map((n) => n.charAt(0))
			.join('');
	};

	const handleLogout = () => {
		logoutMutation.mutate();
	};
</script>

<Dropdown>
	<Dropdown.Trigger>
		<div class="group ml-auto flex cursor-pointer items-center gap-3">
			<div class="hidden flex-col text-right md:flex">
				<span class="text-sm font-medium text-neutral-200 transition-colors group-hover:text-white"
					>{user?.name}</span
				>
				<span class="text-xs text-neutral-500">{user?.email}</span>
			</div>
			{#if user?.avatar}
				<img src={user.avatar} alt={user.name} class="h-9 w-9" />
			{:else}
				<div
					class="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-sky-500 to-indigo-600 text-sm font-semibold text-white shadow-md shadow-sky-500/10"
				>
					{getNameAvatar(user?.name ?? 'John Doe')}
				</div>
			{/if}
		</div>
	</Dropdown.Trigger>
	<Dropdown.Menu align="right">
		<Dropdown.Item href="/app/settings">
			<Icon icon="mdi:account-outline" class="h-4 w-4" />
			<span>My Profile</span>
		</Dropdown.Item>
		<form method="POST" class="w-full">
			<Dropdown.Item onclick={handleLogout} danger={true}>
				<Icon icon="mdi:logout" class="h-4 w-4" />
				<span>Log out</span>
			</Dropdown.Item>
		</form>
	</Dropdown.Menu>
</Dropdown>
