<script lang="ts">
	import { browser } from '$app/environment';
	import favicon from '$lib/assets/favicon.svg';
	import Toaster from '$lib/components/ui/toast/Toaster.svelte';
	import { setToastState } from '$lib/contexts/toast-state.svelte';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import './layout.css';

	let { children } = $props();
	setToastState();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: Infinity,
				refetchOnWindowFocus: false,
				refetchOnReconnect: false
			}
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>
<Toaster />
