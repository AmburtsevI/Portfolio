<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import type { IDevice, IRoomWithDevices, ISelectedStore } from '../types/types';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import api from '../api';
	import { writable } from 'svelte/store';
	import { io } from 'socket.io-client';

	const socket = io('http://localhost:1337', {
		path: '/socket.io/',
	});
	const { selectedHouse } = getContext<ISelectedStore>('selectedId');

	const client = useQueryClient();
	const deviceList = writable<IDevice[]>([]);
	const rooms = writable<IRoomWithDevices[]>([]);
	const unusedDevices = writable<IDevice[]>([]);
	const selectedDevice = writable<IDevice | null>(null);

	const loadRooms = async () => {
		if ($selectedHouse) {
			const { data: result } = await api.get(`/house/withRooms/${$selectedHouse}`);

			if (result.success && result.data?.rooms) {
				$rooms = result.data.rooms;
				return result.data.rooms;
			}
		} else {
			$rooms = [];
			return [];
		}
	};

	const getUnusedDevices = async () => {
		const { data: result } = await api.get('/device/getUnused');

		if (result.success) {
			unusedDevices.set(result.data);
			return result.data;
		}
		unusedDevices.set([]);
		return [];
	};

	const updateDeviceList = (rooms: IRoomWithDevices[]) => {
		const result = [];
		if (rooms) {
			rooms.forEach((room) => {
				if (room.devices) {
					room.devices.forEach((device) => {
						result.push(device);
					});
				}
			});
			if ($selectedDevice) {
				$selectedDevice = result.find((device) => device.id === $selectedDevice.id);
			}
		}
		$deviceList = result;
	};

	const updateDeviceInfo = (data: IDevice) => {
		for (const room of $rooms) {
			if (room.devices) {
				for (let i = 0; i < room.devices.length; i++) {
					if (room.devices[i].id === data.id) {
						room.devices[i] = data;
					}
				}
			}
		}
		$rooms = $rooms;
	};

	const updateDevice = async (data: IDevice) => {
		const { data: result } = await api.put(`/device/update/${data.id}`, data);

		if (result.success) {
			client.invalidateQueries(['rooms']);
		}
	};

	const roomQuery = createQuery({ queryKey: ['rooms'], queryFn: loadRooms });
	$: $roomQuery.data;

	const unusedDevicesQuery = createQuery({ queryKey: ['unusedDevices'], queryFn: getUnusedDevices });
	$: $unusedDevicesQuery.data;

	$: updateDeviceList($rooms);

	socket.on('deviceUpdated', (e) => {
		updateDeviceInfo(e);
	});

	$: if ($selectedHouse) {
		client.invalidateQueries(['rooms']);
	}

	setContext('rooms', rooms);
	setContext('deviceList', deviceList);
	setContext('updateDevice', updateDevice);
	setContext('unusedDevices', { unusedDevicesQuery, list: unusedDevices });
	setContext('selectedDevice', selectedDevice);
</script>

<slot />
