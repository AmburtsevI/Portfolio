<script lang="ts">
  import { onMount } from 'svelte';
  import floor from '../assets/floor.png';
  import { fade } from 'svelte/transition';
  import { clickoutside } from '../utils/clickOutside';
  import { axiosInstance } from '../utils/http';
  import { deviceIcon, deviceInterfaces } from '../utils/devices';
  import type { device } from '../types/types';
  import DeviceOptions from '../components/DeviceOptions.svelte';

  let devices: Record<string, any>[] = [];
  let openMenu = 0;

  const getAllDevices = async () => {
    try {
      const { data } = await axiosInstance.get('/device/findAll/7');
      devices = data;
    } catch (error) {
      throw error;
    }
  };

  const createDevicesOnFloor = async (device: device) => {
    try {
      const { data } = await axiosInstance.post('/device/create', device);
      devices = [...devices, data];
    } catch (error) {
      throw error;
    }
  };

  const handleDrop = (e: DragEvent) => {
    const deviceData = e.dataTransfer?.getData('device');
    if (!deviceData) {
      return;
    }
    const device = JSON.parse(deviceData);

    const imgRect = (e.currentTarget as Element).getBoundingClientRect();

    const x = e.clientX - imgRect.left - 25;
    const y = e.clientY - imgRect.top - 25;

    device.position = { x, y };
    if (!device.params) {
      device.params = deviceInterfaces(device.type);
    }

    createDevicesOnFloor(device);
  };

  onMount(() => {
    getAllDevices();
  });

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="wrapper" on:drop|preventDefault={handleDrop} on:dragover>
  <img
    src={floor}
    alt="floor"
    class="floor"
    on:dragover|preventDefault
  />
  {#each devices as device}
    {#if device.position}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="device"
        style="left: {device.position.x}px; top: {device.position.y}px;"
        on:click={() => (openMenu = device.id)}
      >
        <img src={deviceIcon(device.type)} alt={device.name} class="icon" />
        {#if openMenu === device.id}
          <div
            class="control-menu"
            transition:fade
            use:clickoutside
            on:outclick={() => (openMenu = 0)}
          >
            <DeviceOptions {device} />
          </div>
        {/if}
      </div>
    {/if}
  {/each}
</div>

<style lang="scss">
  .wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .device {
      width: 50px;
      height: 50px;
      display: flex;
      border-radius: 50%;
      position: absolute;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.33);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10.2px);
      z-index: 9;

      .control-menu {
        position: absolute;
        width: 160px;
        height: fit-content;
        background-color: #444444;
        left: 60px;
        height: fit-content;
        padding: 5px 10px 10px 10px;
        border-radius: 10px;
        z-index: 20;

        &::before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          left: -5px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          background-color: inherit;
        }
      }
      .icon {
        width: 30px;
      }
    }
    .floor {
      transform: scale(1.3);
      // width: 80%;
      // height: 80%;
    }
  }
</style>
