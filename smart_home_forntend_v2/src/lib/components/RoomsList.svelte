<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { IModalSettings, IRoomWithDevices } from '../types/types';
	import RoomHeader from './ui/RoomHeader.svelte';
	import ButtonAddRoom from './ui/ButtonAddRoom.svelte';
	import AddDeviceToRoom from './ui/AddDeviceToRoom.svelte';
	import DeviceItem from './ui/DeviceItem/DeviceItem.svelte';
	import EditIcon from './icons/EditIcon.svelte';
	import RemoveIcon from './icons/RemoveIcon.svelte';
	import { deviceTypesWithTranslate } from './ui/DeviceItem/deviceInfo';

	const rooms = getContext<Writable<IRoomWithDevices[]>>('rooms');

	const modalConfig = getContext<Writable<IModalSettings>>('modalConfig');

	const handleClickTooltip = (variant, type, initialData) => {
		$modalConfig.show({
			variant: variant,
			type: type,
			initialData: initialData,
		});
	};
</script>

<!-- <ButtonAddRoom /> -->
<div class="flex flex-col gap-2">
	{#each $rooms as room (`room_${room.id}`)}
		<RoomHeader data={room} />
		<div class="flex flex-col gap-2">
			{#each room.devices as device (device.id)}
				<div class="flex gap-1 items-center">
					<DeviceItem data={device} />
					<button
						type="button"
						class="btn p-0 w-12 h-10"
						on:click={() => handleClickTooltip('edit', 'device', { ...device, type_values: deviceTypesWithTranslate })}
					>
						<EditIcon classes="w-4 h-4" />
					</button>
					<button type="button" class="btn p-0 w-12 h-10" on:click={() => handleClickTooltip('delete', 'device', device)}
						><RemoveIcon classes="w-4 h-4" /></button
					>
				</div>
			{/each}
			<!-- <AddDeviceToRoom roomId={room.id} /> -->
		</div>
	{/each}
</div>
