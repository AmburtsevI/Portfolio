<script lang="ts">
	import { writable } from 'svelte/store';
	import api from '../api';
	import type { IDevice, IHouse, ISpaceWithRooms } from '../types/types';
	import { onMount, setContext } from 'svelte';
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import Modal from '../components/Modals/CreateModal.svelte';
	import createStores from './selectStores';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';

	const modalComponent: ModalComponent = {
		ref: Modal,
	};

	const modalSettings: ModalSettings = {
		type: 'component',
		component: modalComponent,
	};

	const houses = writable<IHouse[]>([]);
	const selectedHouseData = writable<IHouse | null>(null);
	const { selectedHouse } = createStores();

	const loadSpaces = async () => {
		const { data: result } = await api.get('/house');
		if (result.success) {
			houses.set(result.data);
		}
		return result;
	};

	const spacesQuery = createQuery({
		queryKey: ['house'],
		queryFn: loadSpaces,
	});

	const validateSpaceAndHouses = () => {
		if ($houses.length && $selectedHouse) {
			if (!$houses.find((house) => house.id === $selectedHouse)) {
				$selectedHouse = null;
			}
		}
	};

	// const openModal = () => {
	// 	modalStore.trigger(modalSettings);
	// };
	const closeModal = () => {
		modalStore.close();
	};

	$: selectedHouseData.set($houses.find((house) => house.id === $selectedHouse));

	$: if ($spacesQuery.isFetched) {
		validateSpaceAndHouses();
	}

	setContext('houses', houses);
	setContext('selectedId', {
		selectedHouse,
	});
	setContext('selectedData', {
		selectedHouseData,
	});

	onMount(async () => {
		await loadSpaces();
	});
</script>

<slot />
