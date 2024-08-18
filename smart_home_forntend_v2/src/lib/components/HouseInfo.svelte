<script lang="ts">
	import { getContext } from 'svelte';
	import type { IHouse, IModalSettings, ISelectedDataStore, ISelectedStore, ISpaceWithRooms } from '../types/types';
	import EditIcon from './icons/EditIcon.svelte';
	import Select from './ui/Select.svelte';
	import type { Writable } from 'svelte/store';
	import AddIcon from './icons/AddIcon.svelte';
	import RemoveIcon from './icons/RemoveIcon.svelte';

	const { selectedHouseData, selectedSpaceData } = getContext<ISelectedDataStore>('selectedData');
	const { selectedHouse, selectedSpace } = getContext<ISelectedStore>('selectedId');
	const spaces = getContext<Writable<ISpaceWithRooms[]>>('spaces');
	const houses = getContext<Writable<IHouse[]>>('houses');
	const modalConfig = getContext<Writable<IModalSettings>>('modalConfig');

	const handleClickTooltip = (variant, type, initialData) => {
		$modalConfig.show({
			variant: variant,
			type: type,
			initialData: initialData,
		});
	};
</script>

<div class="flex justify-between w-full">
	<div class="flex flex-col gap-6">
		<div class="flex flex-col items-start gap-2">
			<span>Выберите дом</span>
			<div class="flex gap-2">
				{#key $selectedSpace}
					<Select values={$houses} selectedValue={$selectedHouse} on:select={(e) => selectedHouse.set(e.detail)} />
				{/key}
				<button type="button" class="btn p-0 w-12 h-10" on:click={() => handleClickTooltip('create', 'house', {})}
					><AddIcon classes="w-4 h-4" /></button
				>
				<button
					type="button"
					class="btn p-0 w-12 h-10"
					disabled={!$selectedHouse}
					on:click={() => handleClickTooltip('edit', 'house', $selectedHouseData)}
				>
					<EditIcon classes="w-4 h-4" />
				</button>
				<button
					type="button"
					class="btn p-0 w-12 h-10"
					disabled={!$selectedHouse}
					on:click={() => handleClickTooltip('delete', 'house', $selectedHouseData)}><RemoveIcon classes="w-4 h-4" /></button
				>
			</div>
		</div>
	</div>
</div>
