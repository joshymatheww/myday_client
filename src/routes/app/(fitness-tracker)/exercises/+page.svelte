<script lang="ts">
	import Drawer from '$lib/components/ui/modals/Drawer.svelte';
	import { setExerciseState } from '$lib/contexts/exercise-state.svelte';
	import { getAllExercises } from '$lib/services/execises';
	import Icon from '@iconify/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import ExerciseFilter from './ExerciseFilter.svelte';
	import ExerciseForm from './ExerciseForm.svelte';
	import ExerciseList from './ExerciseList.svelte';

	let isModalOpen = $state(false);

	const exerciseState = setExerciseState();

	const exerciseQuery = createQuery(() => ({
		queryKey: ['exercises'],
		queryFn: () => getAllExercises()
	}));

	$effect(() => {
		if (exerciseQuery.data) {
			exerciseState.allExercises = exerciseQuery.data;
		}
		if (!isModalOpen) {
			exerciseState.resetSelected();
		}
	});
</script>

<svelte:head>
	<title>Exercises | Fitness Tracker</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold tracking-tight text-white">Exercises Catalog</h1>
			<p class="text-sm text-neutral-400">Build, structure, and categorize your fitness routines</p>
		</div>
		<div class="flex items-center gap-2.5 sm:justify-end">
			<button
				onclick={() => exerciseState.toggleFilters()}
				class={[
					'flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all focus:outline-hidden',
					exerciseState.isFilterVisible
						? 'border-sky-500/30 bg-sky-500/10 text-sky-400 shadow-xs'
						: 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
				]}
			>
				<Icon
					icon={exerciseState.isFilterVisible ? 'mdi:filter-off-outline' : 'mdi:filter-outline'}
					class="h-5 w-5"
				/>
				<span>Filters</span>
				{#if exerciseState.hasActiveFilters()}
					<span class="ml-1 flex h-2 w-2 rounded-full bg-sky-400"></span>
				{/if}
			</button>

			<button
				onclick={() => (isModalOpen = true)}
				class="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-sky-500/10 transition-opacity hover:opacity-95"
			>
				<Icon icon="mdi:plus" class="h-5 w-5" />
				Add Exercise
			</button>
		</div>
	</div>

	{#if exerciseQuery.isLoading}
		<div class="flex items-center justify-center p-8">
			<p>Loading your routine records...</p>
		</div>
	{:else if exerciseQuery.isError}
		<div class="p-8 text-red-500">
			<p>Failed to connect to server: {exerciseQuery.error.message}</p>
		</div>
	{:else}
		{#if exerciseState.isFilterVisible}
			<ExerciseFilter />
		{/if}

		<ExerciseList bind:isModalOpen />
	{/if}

	{#if isModalOpen}
		<Drawer bind:isDrawerOpen={isModalOpen}>
			<ExerciseForm bind:isModalOpen />
		</Drawer>
	{/if}
</div>
