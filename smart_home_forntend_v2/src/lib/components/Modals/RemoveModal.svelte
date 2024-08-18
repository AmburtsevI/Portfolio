<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import Input from '../ui/Input.svelte';
	import type { Writable } from 'svelte/store';
	import type { IModalSettings } from '../../types/types';
	import Select from '../ui/Select.svelte';

	export let title: string = '';
	export let text: string = '';
	export let onSubmit: (id: number) => Promise<any>;
	export let initialData: any = {};

	const modalConfig = getContext<Writable<IModalSettings>>('modalConfig');

	let formData = {};
	let loading;
	let error = '';

	const handleDelete = async (e: Event) => {
		e.preventDefault();
		loading = true;

		const { data: result }: any = await onSubmit(initialData?.id);
		if (result.success) {
			$modalConfig.close();
		} else {
			error = result.message;
			loading = false;
		}
	};
</script>

<div class="card flex flex-col gap-6 min-w-[350px]">
	<h2 class="text-2xl self-start">{title}</h2>
	<span>{text}</span>
	{#if error}
		<span class="text-error-400">{error}</span>
	{/if}
	<div class="flex justify-end gap-2">
		<button class="btn variant-filled self-end" on:click={handleDelete}> Удалить </button>
		<button class="btn variant-outline self-end" on:click={$modalConfig.close}> Отмена </button>
	</div>
</div>
