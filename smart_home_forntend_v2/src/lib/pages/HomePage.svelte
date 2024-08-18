<script lang="ts">
	import { AppShell, Modal } from '@skeletonlabs/skeleton';
	import HouseProvider from '../providers/HouseProvider.svelte';
	import Side from '../components/Side.svelte';
	import RoomsProvider from '../providers/RoomsProvider.svelte';
	import ModalProvider from '../providers/ModalProvider/ModalProvider.svelte';
	import ButtonAddDevice from '../components/ui/ButtonAddDevice.svelte';
	import MapWrapper from '../components/Map/MapWrapper.svelte';
</script>

<HouseProvider>
	<RoomsProvider>
		<ModalProvider>
			<AppShell>
				<svelte:fragment slot="sidebarLeft">
					<div id="sidebar-left" class="block w-max">
						<Side />
					</div>
				</svelte:fragment>
				<MapWrapper />
			</AppShell>
			<Modal />
		</ModalProvider>
	</RoomsProvider>
</HouseProvider>
