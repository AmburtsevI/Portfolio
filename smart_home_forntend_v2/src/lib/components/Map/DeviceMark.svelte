<script lang="ts">
	import { getContext } from 'svelte';
	import type { IDevice } from '../../types/types';
	import type { Writable } from 'svelte/store';
	import deviceImages from './deviceImages';
	export let data: IDevice;

	const selectedDevice = getContext<Writable<IDevice | null>>('selectedDevice');
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="absolute rounded-xl w-10 h-10 p-2 bg-surface-100/50 cursor-pointer border-2 border-transparent"
	style="left: {data.x}px; top: {data.y}px;"
	class:active={$selectedDevice?.id === data.id}
	on:click|stopPropagation={() => selectedDevice.set(data)}
>
	<img src={deviceImages?.[data.type]} />
</div>

<style>
	.active {
		@apply border-surface-400;
	}
</style>
