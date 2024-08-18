<script lang="ts">
	import { getContext } from 'svelte';
	import type { IDevice } from '../../../types/types';
	import { deviceTranslation } from './deviceInfo';
	import type { Writable } from 'svelte/store';

	const selectedDevice = getContext<Writable<IDevice | null>>('selectedDevice');

	export let data: IDevice;

	$: active = $selectedDevice === data;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="flex justify-between bg-surface-700 relative rounded-lg py-4 px-4 w-full felx-1 cursor-pointer border-2 hover:bg-surface-800 transition-colors {active
		? 'border-surface-200'
		: 'border-transparent'}"
	on:click={() => selectedDevice.set(data)}
>
	<div class="flex flex-col items-start">
		<span>{data.name}</span>
		<span class="text-gray-400 text-xs">({deviceTranslation?.[data.type] ?? data.type})</span>
	</div>
	<slot />
</div>
