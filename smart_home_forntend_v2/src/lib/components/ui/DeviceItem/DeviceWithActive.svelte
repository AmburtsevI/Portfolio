<script lang="ts">
	import DeviceItemBase from './DeviceItemBase.svelte';
	import type { IDevice } from '../../../types/types';

	export let data: IDevice;
</script>

<DeviceItemBase {data}>
	<div class="absolute top-4 right-4 w-2 h-2 rounded-full transition-colors {data.active ? 'bg-success-500' : 'bg-slate-400'}" />
	<slot />
</DeviceItemBase>
