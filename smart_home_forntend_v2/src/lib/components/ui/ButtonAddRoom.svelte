<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { IHouse, IModalSettings, ISelectedStore } from '../../types/types';
	import { getContext } from 'svelte';

	const modalConfig = getContext<Writable<IModalSettings>>('modalConfig');
	const { selectedHouse } = getContext<ISelectedStore>('selectedId');
	const houses = getContext<Writable<IHouse[]>>('houses');

	const handleClickTooltip = (variant, type, initialData) => {
		$modalConfig.show({
			variant: variant,
			type: type,
			initialData: initialData,
		});
	};
</script>

<button
	type="button"
	class="btn variant-filled"
	on:click={() => handleClickTooltip('create', 'rooms', { house_id: $selectedHouse, house_id_values: $houses })}>Добавить комнату</button
>
