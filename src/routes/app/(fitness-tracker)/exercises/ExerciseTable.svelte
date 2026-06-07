<script lang="ts">
	import { getExerciseState } from '$lib/contexts/exercise-state.svelte';
	import ExerciseOptions from './ExerciseOptions.svelte';

	const exerciseState = getExerciseState();
	const exercisesList = $derived(exerciseState.filteredExercises);
</script>

<div
	class="hidden w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-xl backdrop-blur-md md:block"
>
	<div class="w-full overflow-x-auto">
		<table class="w-full min-w-max border-collapse text-left">
			<thead>
				<tr
					class="border-b border-neutral-800 bg-neutral-900/40 text-xs font-semibold tracking-wider whitespace-nowrap text-neutral-400 uppercase"
				>
					<th
						class="sticky left-0 z-10 border-b border-neutral-800 bg-neutral-900 px-6 py-4 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)]"
					>
						Exercise Name
					</th>
					<th class="px-6 py-4">Target Muscle</th>
					<th class="px-6 py-4">Equipment Needed</th>
					<th class="px-6 py-4">Difficulty Level</th>
					<th class="px-6 py-4 text-right">Actions</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-neutral-800/60 text-sm text-neutral-300">
				{#each exercisesList as exercise (exercise.id)}
					<tr class="group transition-colors hover:bg-neutral-900/30">
						<td
							class="sticky left-0 z-10 bg-neutral-950 px-6 py-4 font-medium whitespace-nowrap text-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)] transition-colors group-hover:bg-[#121212]"
						>
							{exercise.name}
						</td>
						<td class="px-6 py-4 whitespace-nowrap capitalize">
							<span class="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs">
								{exercise.category}
							</span>
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-neutral-400 capitalize">
							{exercise.equipement.replace('_', ' ')}
						</td>
						<td class="px-6 py-4 whitespace-nowrap capitalize">
							<span
								class={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${exercise.difficulty === 'easy' ? 'bg-green-500/5 text-green-400' : exercise.difficulty === 'medium' ? 'bg-amber-500/5 text-amber-400' : 'bg-red-500/5 text-red-400'}`}
							>
								<span
									class={`h-1.5 w-1.5 rounded-full ${exercise.difficulty === 'easy' ? 'bg-green-400' : exercise.difficulty === 'medium' ? 'bg-amber-400' : 'bg-red-400'}`}
								></span>
								{exercise.difficulty}
							</span>
						</td>
						<td class="px-6 py-4 text-right whitespace-nowrap">
							<div
								class="flex items-center justify-end gap-2 transition-opacity group-hover:opacity-100 md:opacity-0"
							>
								<ExerciseOptions selectedExercise={exercise} />
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
