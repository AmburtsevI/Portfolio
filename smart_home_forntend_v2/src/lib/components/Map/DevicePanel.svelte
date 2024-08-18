<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { IDevice } from '../../types/types';
	import { deviceTranslation } from '../ui/DeviceItem/deviceInfo';
	import { fade } from 'svelte/transition';
	import { RangeSlider, SlideToggle } from '@skeletonlabs/skeleton';

	const bound = { x: 760, y: 499 };

	const selectedDevice = getContext<Writable<IDevice | null>>('selectedDevice');
	const deviceList = getContext<Writable<IDevice[]>>('deviceList');
	const updateDevice = getContext<any>('updateDevice');

	const handleSave = () => {
		updateDevice({ ...$selectedDevice });
	};

	$: ($deviceList = $deviceList), $selectedDevice;
</script>

{#if $selectedDevice}
	<div class=" absolute top-4 left-4 p-2 w-[250px] flex flex-col bg-surface-800 rounded-lg" transition:fade={{ duration: 200 }}>
		<h3>{$selectedDevice.name}</h3>
		<p class="text-xs">{deviceTranslation[$selectedDevice.type]}</p>

		<span class="self-start pl-2">X: {$selectedDevice.x}</span>
		<RangeSlider name="x" bind:value={$selectedDevice.x} min={0} max={bound.x} />
		<span class="self-start pl-2">Y: {$selectedDevice.y}</span>
		<RangeSlider name="y" bind:value={$selectedDevice.y} min={0} max={bound.y} />
		<div class="flex flex-col pt-4 gap-3">
			<div class="flex justify-between px-2">
				Работает: <SlideToggle name="active" bind:checked={$selectedDevice.active} size="sm" />
			</div>
			{#if $selectedDevice.type === 'thermostat' || $selectedDevice.type === 'conditioner' || $selectedDevice.type === 'heating'}
				<label class="label flex flex-col px-2">
					<span class="self-start">Температура</span>
					<input class="input rounded-md px-2" bind:value={$selectedDevice.temperature} type="number" placeholder="Input" />
				</label>
			{/if}
			{#if $selectedDevice.type === 'watering' || $selectedDevice.type === 'window' || $selectedDevice.type === 'door'}
				<div class="flex justify-between px-2">
					Активировать датчик: <SlideToggle name="active" bind:checked={$selectedDevice.warning} size="sm" />
				</div>
			{/if}
		</div>
		<button type="button" on:click={handleSave} class="btn variant-filled mt-3">Сохранить</button>
	</div>
{/if}
