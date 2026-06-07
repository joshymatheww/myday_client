<script lang="ts">
	import Icon from '@iconify/svelte';
	import { resolve } from '$app/paths';
	import type { MenuItem } from '$lib/types/menu';
	import { page } from '$app/state';

	type Props = {
		title: string;
		items: MenuItem[];
		onLinkClick?: () => void;
	};

	let { title, items, onLinkClick }: Props = $props();
</script>

<div class="pt-6">
	<h3 class="mb-2 px-4 text-xs font-bold tracking-widest text-neutral-500 uppercase">
		{title}
	</h3>

	<ul class="space-y-1">
		{#each items as item (item.label)}
			{@const isActive = page.url.pathname === item.href}
			<li>
				<a
					onclick={onLinkClick}
					href={resolve(item.href)}
					class={`group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200
						${
							isActive
								? 'border border-sky-500/20 bg-linear-to-r from-sky-500/10 to-indigo-500/10 text-sky-400'
								: 'border border-transparent text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200'
						}`}
				>
					<Icon
						icon={item.icon}
						class={`h-5 w-5 transition-transform duration-200 group-hover:scale-105
							${isActive ? 'text-sky-400' : 'text-neutral-400 group-hover:text-neutral-300'}`}
					/>
					<span>{item.label}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>
