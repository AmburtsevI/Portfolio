<script lang="ts">
	import { Route } from 'svelte-navigator';
	import { useNavigate, useLocation } from 'svelte-navigator';
	import { getContext } from 'svelte';
	import type { IAuthContext } from '../types/types';
	export let path;

	const { isAuth } = getContext<IAuthContext>('auth');
	const navigate = useNavigate();
	const location = useLocation();

	$: if (!$isAuth) {
		navigate('/login', {
			state: { from: $location.pathname },
			replace: true,
		});
	} else {
		navigate('/home', {
			state: { from: $location.pathname },
			replace: true,
		});
	}
</script>

<Route {path} />
