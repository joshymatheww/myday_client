<script lang="ts">
	import { getExerciseState } from '$lib/contexts/exercise-state.svelte';
	import { OPTIONS } from '$lib/utils/options';
	import Icon from '@iconify/svelte';
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	const state = getExerciseState();
</script>

<div
	transition:slide={{ duration: 300, easing: cubicOut }}
	class="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/10 p-4 backdrop-blur-sm"
>
	<div class="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-5">
		<div class="space-y-1.5 lg:col-span-2">
			<label for="search" class="text-xs font-semibold tracking-wider text-neutral-400 uppercase"
				>Search Workouts</label
			>
			<div class="relative w-full">
				<span class="absolute inset-y-0 left-3.5 flex items-center text-neutral-500">
					<Icon icon="mdi:magnify" class="h-5 w-5" />
				</span>
				<input
					type="text"
					id="search"
					placeholder="Search by exercise title..."
					bind:value={state.searchQuery}
					class="w-full rounded-xl border border-neutral-800 bg-neutral-950 py-2 pr-4 pl-11 text-sm text-neutral-200 placeholder-neutral-600 focus:border-sky-500/50 focus:outline-none"
				/>
			</div>
		</div>

		<div class="space-y-1.5">
			<label
				for="filter-category"
				class="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Muscle</label
			>
			<select
				id="filter-category"
				bind:value={state.selectedCategory}
				class="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-200 focus:border-sky-500/50 focus:outline-none"
			>
				<option value="">All Muscles</option>
				{#each OPTIONS.exercise_categories as opt}
					<option value={opt.value}>{opt.label}</option>
				{/each}
			</select>
		</div>

		<div class="space-y-1.5">
			<label
				for="filter-equipment"
				class="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Equipment</label
			>
			<select
				id="filter-equipment"
				bind:value={state.selectedEquipment}
				class="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-200 focus:border-sky-500/50 focus:outline-none"
			>
				<option value="">All Equipment</option>
				{#each OPTIONS.exercise_equipements as opt}
					<option value={opt.value}>{opt.label}</option>
				{/each}
			</select>
		</div>

		<div class="space-y-1.5">
			<label
				for="filter-difficulty"
				class="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Difficulty</label
			>
			<select
				id="filter-difficulty"
				bind:value={state.selectedDifficulty}
				class="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-200 focus:border-sky-500/50 focus:outline-none"
			>
				<option value="">All Levels</option>
				<option value="easy">Easy</option>
				<option value="medium">Medium</option>
				<option value="hard">Hard</option>
			</select>
		</div>
	</div>

	{#if state.searchQuery || state.selectedCategory || state.selectedEquipment || state.selectedDifficulty}
		<div class="flex items-center justify-between border-t border-neutral-800/60 pt-2 text-xs">
			<p class="text-neutral-400">
				Found <span class="font-semibold text-sky-400">{state.filteredExercises.length}</span> matching
				entries.
			</p>
			<button
				onclick={state.clearFilters}
				class="flex items-center gap-1 text-neutral-400 transition-colors hover:text-white"
			>
				<Icon icon="mdi:filter-remove-outline" class="h-3.5 w-3.5" />
				Reset active filters
			</button>
		</div>
	{/if}
</div>
