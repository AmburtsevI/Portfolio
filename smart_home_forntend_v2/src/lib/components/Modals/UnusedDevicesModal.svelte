<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { IDevice } from '../../types/types';
	import DeviceItemBase from '../ui/DeviceItem/DeviceItemBase.svelte';
	import AddIcon from '../icons/AddIcon.svelte';
	import { modalStore } from '@skeletonlabs/skeleton';

	export let roomId: number;
	export let attachDevice: (deviceId: number, roomId: number) => void;

	const { list } = getContext<{ list: Writable<IDevice[]> }>('unusedDevices');

	const attachToRoom = async (deviceId: number, roomId: number) => {
		if (!deviceId || !roomId) {
			return;
		}
		await attachDevice(deviceId, roomId);
		modalStore.close();
	};

	$: if ($list.length === 0) {
		modalStore.close();
	}
</script>

<div class="card flex flex-col gap-6 min-w-[350px]">
	<h2 class="text-2xl self-start">Прикрепить устройство</h2>
	<div class="list">
		{#each $list as item}
			<div class="flex w-full items-center gap-2">
				<DeviceItemBase data={item} />
				<button type="button" class="btn variant-outline w-10 h-10 p-0 rounded-full" on:click={() => attachToRoom(item.id, roomId)}>
					<AddIcon classes="w-4 h-4" />
				</button>
			</div>
		{/each}
	</div>
</div>
