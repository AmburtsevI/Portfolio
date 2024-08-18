<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import Input from '../ui/Input.svelte';
	import type { Writable } from 'svelte/store';
	import type { IModalSettings } from '../../types/types';
	import Select from '../ui/Select.svelte';

	export let title: string = '';
	export let buttonText: string = '';
	export let variant: 'create' | 'update' = 'create';
	export let onSubmit: (formData: any, id: number) => Promise<any>;
	export let initialData: any = {};
	export let typeData: {
		[key: string]: any;
	} = {};

	const modalConfig = getContext<Writable<IModalSettings>>('modalConfig');

	let formData = {};
	let loading;
	let error = '';

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		if (variant === 'create') {
			if (Object.values(formData).some((val) => val === '')) {
				error = 'Заполните все поля';
				return;
			}
		}
		loading = true;

		const { data: result }: any = await onSubmit(formData, initialData?.id);
		if (result.success) {
			$modalConfig.close();
		} else {
			error = result.message;
			loading = false;
		}
	};

	Object.keys(typeData).forEach((key) => {
		formData[key] = '';
	});
</script>

<form class="card flex flex-col gap-6 min-w-[350px]" on:submit={handleSubmit}>
	<h2 class="text-2xl self-start">{title}</h2>
	{#each Object.entries(typeData) as [key, value]}
		{#if value?.select}
			<div class="flex flex-col">
				<span class="self-start">{value.placeholder}</span>
				<Select
					values={initialData?.[`${key}_values`] ?? []}
					selectedValue={initialData?.[key]}
					on:select={(e) => (formData[key] = e.detail)}
				/>
			</div>
		{:else}
			<div class="flex gap-6">
				<Input bind:value={formData[key]} placeholder={value.placeholder} defaultValue={initialData?.[key]} />
			</div>
		{/if}
	{/each}
	{#if error}
		<span class="text-red-400">{error}</span>
	{/if}
	<button class="btn variant-filled self-end">
		{buttonText}
	</button>
</form>
