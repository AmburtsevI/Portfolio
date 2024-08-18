<script lang="ts">
	import planImage from '../../../assets/plan.png';
	import { writable, type Writable } from 'svelte/store';
	import type { IDevice } from '../../types/types';
	import DeviceMark from './DeviceMark.svelte';
	import DevicePanel from './DevicePanel.svelte';
	import { onMount, setContext, getContext } from 'svelte';

	const deviceList = getContext<Writable<IDevice[]>>('deviceList');
	const selectedDevice = getContext<Writable<IDevice | null>>('selectedDevice');

	let scale = 1,
		panning = false,
		pointX = 0,
		pointY = 0,
		start = { x: 0, y: 0 },
		transform = '';

	let disableHide = false;

	function setTransform() {
		transform = `matrix(${scale}, 0, 0, ${scale}, ${pointX}, ${pointY})`
	}

	const handleMouseDown = (e: MouseEvent) => {
		e.preventDefault();
		start = { x: e.clientX - pointX, y: e.clientY - pointY };
		panning = true;
	};

	const handleMouseUp = (e: MouseEvent) => {
		panning = false;
		if (!disableHide) {
			selectedDevice.set(null);
		}
		disableHide = false;
	};

	const handleMouseMove = (e: MouseEvent) => {
		e.preventDefault();
		if (!panning) {
			return;
		}

		if (Math.abs(start.x - e.clientX) > 10 || Math.abs(start.y - e.clientY) > 10) {
			disableHide = true;
		}

		pointX = e.clientX - start.x;
		pointY = e.clientY - start.y;
		setTransform();
	};

	const handleWheel = (e: WheelEvent) => {
		e.preventDefault();

		const clientX = e.clientX - 1200;
		const clientY = e.clientY - 500;

		let xs = (clientX - pointX) / scale,
			ys = (clientY - pointY) / scale,
			delta = -e.deltaY;
		if (delta > 0 && scale > 2) return;
		if (delta < 0 && scale < 1) return;

		delta > 0 ? (scale *= 1.2) : (scale /= 1.2);

		pointX = clientX - xs * scale;
		pointY = clientY - ys * scale;
		
		setTransform();
	};

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="bg-surface-100 rounded-md h-full w-full overflow-hidden flex justify-center items-center relative"
	on:mousedown={handleMouseDown}
	on:mousemove={handleMouseMove}
	on:mouseup={handleMouseUp}
	on:wheel={handleWheel}
>
	<div style="transform: {transform};" class="relative">
		<img src={planImage} alt="" class="w-[800px]" />
		{#each $deviceList as device (device.id)}
			<DeviceMark data={device} />
		{/each}
	</div>
</div>
<!-- <DevicePanel /> -->
