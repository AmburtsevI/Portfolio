<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import api from '../../api';
	import UnusedDevicesModal from '../Modals/UnusedDevicesModal.svelte';
	import AddIcon from '../icons/AddIcon.svelte';
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import { useQueryClient } from '@tanstack/svelte-query';
	import type { Writable } from 'svelte/store';
	import type { IDevice } from '../../types/types';

	export let roomId: number;

	const client = useQueryClient();
	const { list } = getContext<{ list: Writable<IDevice[]> }>('unusedDevices');

	const attachDevice = async (deviceId: number, roomId: number) => {
		const { data: result } = await api.put('device/updateInfo', { id: deviceId, room_id: roomId });
		if (result.success) {
			client.invalidateQueries(['rooms']);
		}
		return result;
	};

	const handleClick = () => {
		if ($list.length === 0) {
			return;
		}
		const modalComponent: ModalComponent = {
			ref: UnusedDevicesModal,
			props: {
				attachDevice,
				roomId,
			},
		};

		const modalSettings: ModalSettings = {
			type: 'component',
			component: modalComponent,
		};
		modalStore.trigger(modalSettings);
	};
</script>

<button type="button" class="btn variant-outline rounded-lg" on:click={handleClick}>
	<AddIcon classes="w-4 h-4" />
</button>
