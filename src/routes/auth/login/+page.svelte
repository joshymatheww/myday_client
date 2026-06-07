<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import Spinner from '$lib/components/ui/shared/Spinner.svelte';
	import { getToastState } from '$lib/contexts/toast-state.svelte';
	import Icon from '@iconify/svelte';
	import { createMutation } from '@tanstack/svelte-query';

	interface LoginCredentials {
		email: string;
		password: string;
	}

	let showPassword = $state(false);
	let isSubmitting = $state(false);

	const toastState = getToastState();

	const loginMutation = createMutation(() => ({
		mutationFn: async ({ email, password }: LoginCredentials) => {
			const res = await fetch(`${PUBLIC_API_BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ email, password })
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || 'Invalid credentials');
			}

			return res.json();
		},
		onSuccess: () => {
			isSubmitting = false;
			// Hono's cookie is now natively inside the browser!
			toastState.addToast('Success', 'Successfully logged in.', 'success');
			goto('/app');
		},
		onError: (error: any) => {
			isSubmitting = false;
			toastState.addToast('Error', error.message, 'error');
		}
	}));

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		isSubmitting = true;
		const formElement = e.currentTarget as HTMLFormElement;
		const formData = new FormData(formElement);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		loginMutation.mutate({ email, password });
	};
</script>

<svelte:head>
	<title>Login | MyDay</title>
</svelte:head>

<div
	class="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950 p-4 text-neutral-100"
>
	<div
		class="pointer-events-none absolute top-1/2 left-1/2 h-112.5 w-112.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[100px]"
	></div>

	<div
		class="relative z-10 w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 shadow-xl backdrop-blur-xl"
	>
		<div class="mb-8 flex flex-col items-center text-center">
			<a href={resolve('/')} class="mb-3 flex items-center gap-2.5">
				<div class="rounded-xl border border-sky-500/20 bg-sky-500/10 p-2">
					<Icon icon="mdi:calendar-today-outline" class="h-5 w-5 text-sky-400" />
				</div>
				<span class="text-xl font-bold tracking-wider text-white">MY DAY</span>
			</a>
			<h2 class="text-xl font-semibold text-neutral-200">Welcome Back</h2>
			<p class="mt-1 text-xs text-neutral-500">Enter your credentials to manage your routine</p>
		</div>

		<form class="space-y-5" method="POST" onsubmit={handleSubmit}>
			<div class="space-y-2">
				<label
					for="email"
					class="block text-xs font-semibold tracking-wide text-neutral-400 uppercase"
					>Email Address</label
				>
				<div class="relative flex items-center">
					<Icon icon="mdi:email-outline" class="absolute left-3.5 h-5 w-5 text-neutral-500" />
					<input
						id="email"
						name="email"
						type="email"
						required
						placeholder="name@example.com"
						class="w-full rounded-xl border border-neutral-800 bg-neutral-950 py-3 pr-4 pl-11 text-sm text-neutral-200 placeholder-neutral-600 transition-all focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/5 focus:outline-none"
					/>
				</div>
			</div>

			<div class="space-y-2">
				<div class="flex items-center justify-between">
					<label
						for="password"
						class="block text-xs font-semibold tracking-wide text-neutral-400 uppercase"
						>Password</label
					>
					<a href="#forgot" class="text-xs text-sky-400 hover:underline">Forgot password?</a>
				</div>
				<div class="relative flex items-center">
					<Icon icon="mdi:lock-outline" class="absolute left-3.5 h-5 w-5 text-neutral-500" />
					<input
						id="password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						required
						placeholder="••••••••"
						class="w-full rounded-xl border border-neutral-800 bg-neutral-950 py-3 pr-12 pl-11 text-sm text-neutral-200 placeholder-neutral-600 transition-all focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/5 focus:outline-none"
					/>
					<button
						type="button"
						onclick={() => (showPassword = !showPassword)}
						class="absolute right-3.5 text-neutral-500 hover:text-neutral-300 focus:outline-none"
					>
						<Icon icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} class="h-5 w-5" />
					</button>
				</div>
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-indigo-600 py-3 text-sm font-medium text-white shadow-lg shadow-sky-500/10 transition-opacity hover:opacity-95 disabled:cursor-not-allowed"
			>
				{#if isSubmitting}
					<Spinner />
					Processing...
				{:else}
					Sign In to Dashboard
				{/if}
			</button>
		</form>

		<div class="mt-6 border-t border-neutral-800/60 pt-6 text-center">
			<span class="text-xs text-neutral-500">Already logged in? </span>
			<a href={resolve('/app')} class="text-xs font-medium text-sky-400 hover:underline"
				>Go to dashboard</a
			>
		</div>
	</div>
</div>
