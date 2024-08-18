<script lang="ts">
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import api from '../api';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import type { IAuthContext } from '../types/types';

	const isAuth = writable(false);
	const client = useQueryClient();
	const checkAuth = async () => {
		const result = await api.get('/auth/isAuth');
		return result.data;
	};

	const authQuery = createQuery({
		queryKey: ['auth'],
		queryFn: checkAuth,
	});

	const login = async (
		email,
		password
	): Promise<{
		success: boolean;
	}> => {
		const result = await api.post('/auth', { email, password });
		if (result.data.success) {
			client.invalidateQueries(['auth']);
			isAuth.set(true);

			localStorage.setItem('token', result.data.data.access_token);
		}

		return result.data;
	};

	const logout = () => {};
	authQuery.subscribe(({ data }) => {
		if (data?.success) {
			isAuth.set(true);
		}
	});

	setContext<IAuthContext>('auth', { isAuth, authQueryData: authQuery, login, logout });
</script>

<slot />
