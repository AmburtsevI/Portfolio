<script lang="ts">
	import { getContext } from 'svelte';
	import { ZodError, z } from 'zod';
	import type { IAuthContext } from '../types/types';
	import { useNavigate } from 'svelte-navigator';
	import { onMount } from 'svelte';

	const { login, isAuth } = getContext<IAuthContext>('auth');
	const navigate = useNavigate();

	const formData = {
		email: '',
		password: '',
	};
	let errorMessages = {
		email: '',
		password: '',
		global: '',
	};

	const schema = z.object({
		email: z.string({ required_error: 'Поле не может быть пустым' }).email({ message: 'Неправильный формат email' }),
		password: z.string({ required_error: 'Поле не может быть пустым' }).min(1, { message: 'Поле не может быть пустым' }),
	});

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		try {
			const data = schema.parse(formData);
			const result = await login(data.email, data.password);

			if (!result.success) {
				errorMessages.global = 'Неправильный логин или пароль';
			}
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				for (const issue of error.issues) {
					errorMessages[issue.path[0]] = issue.message;
				}
			}
		}
	};

	const clearError = (type) => {
		errorMessages[type] = '';
		errorMessages.global = '';
	};

	onMount(() => {
		if ($isAuth) {
			navigate('/home', { replace: true });
		}
	});
</script>

<div class="w-full flex justify-center">
	<section class="card">
		<form class="flex flex-col" on:submit={handleSubmit}>
			<span class="text-xl pb-4">Войти</span>

			<div class="flex flex-col">
				<div class="group flex flex-col">
					<div class="input-group grid-cols-[auto_1fr_auto] rounded-container-token">
						<input
							bind:value={formData.email}
							on:input={() => clearError('email')}
							class="bg-transparent border-0 ring-0 p-2 focus-visible:outline-none"
							class:input-error={errorMessages.email !== ''}
							placeholder="Email"
							type="email"
						/>
					</div>
					<small class="self-start text-error-300 ml-2 h-6">{errorMessages.email}</small>
				</div>
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
					<input
						bind:value={formData.password}
						on:input={() => clearError('password')}
						class="bg-transparent border-0 ring-0 p-2 focus-visible:outline-none"
						class:input-error={errorMessages.password !== ''}
						placeholder="Password"
						type="password"
					/>
				</div>
				<small class="self-start text-error-300 ml-2 h-6">{errorMessages.password}</small>
			</div>
			<div class="bottom flex flex-col">
				<small class="self-start text-error-300 ml-2 h-6">{errorMessages.global}</small>

				<button class="btn variant-ringed focus:outline-none"> Войти</button>
			</div>
		</form>
	</section>
</div>
