<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { IDevice, IModalSettings } from '../../types/types';
	import DeviceItemBase from './DeviceItem/DeviceItemBase.svelte';
	import EditIcon from '../icons/EditIcon.svelte';
	import RemoveIcon from '../icons/RemoveIcon.svelte';
	import { deviceTypesWithTranslate } from './DeviceItem/deviceInfo';

	const { list } = getContext<{ list: Writable<IDevice[]> }>('unusedDevices');
	const modalConfig = getContext<Writable<IModalSettings>>('modalConfig');

	const handleClickTooltip = (variant, type, initialData) => {
		$modalConfig.show({
			variant: variant,
			type: type,
			initialData: initialData,
		});
	};
</script>

<div class="flex flex-col gap-6">
	<div class="list">
		{#each $list as item}
			<div class="flex gap-1 items-center">
				<DeviceItemBase data={item} />
				<button
					type="button"
					class="btn p-0 w-12 h-10"
					on:click={() => handleClickTooltip('edit', 'device', { ...item, type_values: deviceTypesWithTranslate })}
				>
					<EditIcon classes="w-4 h-4" />
				</button>
				<button type="button" class="btn p-0 w-12 h-10" on:click={() => handleClickTooltip('delete', 'device', item)}
					><RemoveIcon classes="w-4 h-4" /></button
				>
			</div>
		{/each}
	</div>
</div>
