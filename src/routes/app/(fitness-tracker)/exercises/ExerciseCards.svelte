<script lang="ts">
	import { getExerciseState } from '$lib/contexts/exercise-state.svelte';
	import ExerciseOptions from './ExerciseOptions.svelte';

	const state = getExerciseState();
	const exercisesList = $derived(state.filteredExercises);
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
	{#each exercisesList as exercise (exercise.id)}
		<div
			class="relative flex flex-col justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/20 p-5 shadow-lg backdrop-blur-md"
		>
			<div class="flex items-start justify-between gap-4">
				<div class="min-w-0">
					<h4 class="truncate text-base leading-tight font-semibold text-white">
						{exercise.name}
					</h4>
					<span
						class="mt-1.5 inline-block rounded-md border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-xs text-neutral-300 capitalize"
					>
						{exercise.category}
					</span>
				</div>

				<div class="flex shrink-0 items-center gap-1">
					<ExerciseOptions selectedExercise={exercise} />
				</div>
			</div>

			<div
				class="flex flex-wrap items-center justify-between gap-2 border-t border-neutral-800/60 pt-2 text-xs"
			>
				<div class="flex flex-col gap-0.5">
					<span class="text-[10px] font-medium tracking-wider text-neutral-500 uppercase"
						>Equipment</span
					>
					<span class="text-neutral-300 capitalize">{exercise.equipement.replace('_', ' ')}</span>
				</div>

				<div class="flex flex-col items-end gap-1">
					<span class="text-[10px] font-medium tracking-wider text-neutral-500 uppercase"
						>Difficulty</span
					>
					<span
						class={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-medium capitalize ${exercise.difficulty === 'easy' ? 'bg-green-500/5 text-green-400' : exercise.difficulty === 'medium' ? 'bg-amber-500/5 text-amber-400' : 'bg-red-500/5 text-red-400'}`}
					>
						<span
							class={`h-1.5 w-1.5 rounded-full ${exercise.difficulty === 'easy' ? 'bg-green-400' : exercise.difficulty === 'medium' ? 'bg-amber-400' : 'bg-red-400'}`}
						></span>
						{exercise.difficulty}
					</span>
				</div>
			</div>
		</div>
	{/each}
</div>
