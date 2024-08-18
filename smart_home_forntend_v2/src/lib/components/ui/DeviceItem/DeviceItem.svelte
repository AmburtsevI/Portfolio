<script lang="ts">
	import type { IDevice } from '../../../types/types';
	import DeviceWithActive from './DeviceWithActive.svelte';

	export let data: IDevice;
</script>

<DeviceWithActive {data} />
