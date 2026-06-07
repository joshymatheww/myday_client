<script lang="ts">
	import { resolve } from '$app/paths';
	import Icon from '@iconify/svelte';
</script>

<svelte:head>
	<title>Welcome to MyDay</title>
</svelte:head>

<div
	class="relative flex min-h-screen w-full flex-col overflow-hidden bg-neutral-950 text-neutral-100 select-none"
>
	<div
		class="pointer-events-none absolute top-[-10%] right-[-10%] h-125 w-125 rounded-full bg-sky-500/10 blur-[120px]"
	></div>
	<div
		class="pointer-events-none absolute bottom-[-10%] left-[-10%] h-125 w-125 rounded-full bg-indigo-500/10 blur-[120px]"
	></div>

	<header
		class="relative z-10 mx-auto flex h-20 w-full max-w-7xl items-center justify-between border-b border-neutral-900/50 px-6"
	>
		<div class="flex items-center gap-3">
			<div class="rounded-xl border border-sky-500/20 bg-sky-500/10 p-2">
				<Icon icon="mdi:calendar-today-outline" class="h-5 w-5 text-sky-400" />
			</div>
			<span
				class="bg-linear-to-r from-white to-neutral-400 bg-clip-text text-lg font-bold tracking-wider text-transparent"
				>MY DAY</span
			>
		</div>
		<a
			href={resolve('/auth/login')}
			class="rounded-xl border border-neutral-800 bg-neutral-900 px-5 py-2 text-sm font-medium shadow-md transition-all hover:border-neutral-700 hover:text-white"
		>
			Sign In
		</a>
	</header>

	<main
		class="relative z-10 mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 text-center"
	>
		<div
			class="mb-6 inline-flex animate-pulse items-center gap-2 rounded-full border border-sky-500/10 bg-sky-500/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-sky-400 uppercase"
		>
			✨ Meet Your All-In-One Workspace
		</div>

		<h1 class="mb-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-white sm:text-6xl">
			Master Your Finances. <br />
			<span class="`bg-linear-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text"
				>Elevate Your Fitness.</span
			>
		</h1>

		<p class="mb-10 max-w-xl text-lg leading-relaxed text-neutral-400">
			Track your transactions, manage exercise routines, and optimize your schedule effortlessly
			with MY DAY.
		</p>

		<div class="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href={resolve('/auth/login')}
				class="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-indigo-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-sky-500/10 transition-opacity hover:opacity-95 sm:w-auto"
			>
				Get Started Free
				<Icon
					icon="mdi:arrow-right"
					class="h-4 w-4 transition-transform group-hover:translate-x-1"
				/>
			</a>
			<a
				href="https://github.com"
				target="_blank"
				class="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-8 py-3.5 text-sm font-medium text-neutral-300 transition-all hover:bg-neutral-800/60 hover:text-white sm:w-auto"
			>
				<Icon icon="mdi:github" class="h-5 w-5" />
				Documentation
			</a>
		</div>
	</main>

	<footer
		class="relative z-10 w-full border-t border-neutral-900/40 py-6 text-center text-xs text-neutral-600"
	>
		&copy; 2026 MY DAY Platform. All rights reserved.
	</footer>
</div>
