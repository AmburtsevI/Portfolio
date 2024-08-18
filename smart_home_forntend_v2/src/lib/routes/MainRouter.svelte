<script lang="ts">
	import { Route, useLocation } from 'svelte-navigator';
	import Auth from '../pages/Auth.svelte';
	import { getContext } from 'svelte';
	import type { IAuthContext } from '../types/types';
	import RedirectRoute from './RedirectRoute.svelte';
	import HomePage from '../pages/HomePage.svelte';
	const location = useLocation();

	const { isAuth, authQueryData } = getContext<IAuthContext>('auth');
</script>

{#if !$authQueryData.isLoading}
	<RedirectRoute path="/" />
	<Route path="login">
		<Auth />
	</Route>
	{#if $isAuth}
		<Route path="home">
			<HomePage />
		</Route>
	{/if}
{:else}
	Loading
{/if}
