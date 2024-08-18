<script lang="ts">
	import { getContext } from 'svelte';
	import SpaceInfo from './HouseInfo.svelte';
	import RoomsList from './RoomsList.svelte';
	import ButtonAddDevice from './ui/ButtonAddDevice.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import UnusedDevices from './ui/UnusedDevices.svelte';
</script>

<div class="flex bg-surface-900 w-[400px] h-screen p-6 flex-col gap-6 relative pb-20">
	<SpaceInfo />
	<ButtonAddDevice />
	<hr />
	<Accordion>
		<AccordionItem open>
			<svelte:fragment slot="summary">Устройства в доме</svelte:fragment>
			<svelte:fragment slot="content">
				<RoomsList />
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary">Неиспользованные устройства</svelte:fragment>
			<svelte:fragment slot="content">
				<UnusedDevices />
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>
