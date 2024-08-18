<script lang="ts">
  import arrow from '../assets/arrow.svg';
  import { clickoutside } from '../utils/clickOutside';
  import { axiosInstance } from '../utils/http';
  import { devicesStore, updateDevices } from '../stores/devicesStore';
  import { onDestroy, onMount } from 'svelte';
  import { deviceIcon } from '../utils/devices';

  let show = false;
  let dragged: number | null = null;
  let unsub;

  const handleDragStart = (event: DragEvent, device: any) => {
    if (!event.dataTransfer) {
      return;
    }

    dragged = device.id;
    const imageEl = createImage(device.svg);
    if (imageEl) event.dataTransfer.setDragImage(imageEl, 30, 30);
    event.dataTransfer.setData('device', JSON.stringify(device));
  };

  const createImage = (svgElement: string) => {
    const img = new Image();
    img.src = svgElement;

    img.onload = () => {
      img.style.width = '60px';
      img.style.height = '60px';
    };

    return img;
  };

  const fetchDevices = async () => {
    try {
      const { data } = await axiosInstance.get('/device/findAllCustomDevices');
      if (data) {
        updateDevices(data);
      }
    } catch (error) {
      throw error;
    }
  };

  onMount(() => {
    fetchDevices();
  });

  unsub = devicesStore.subscribe(() => {});

  onDestroy(() => {
    unsub();
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="open-panel" class:active={show} on:click={() => (show = !show)}>
  <img class="arrow" src={arrow} alt="arrow" />
  <span class="text">Устройства</span>
</div>
<div
  class="side-panel"
  class:active={show}
  use:clickoutside
  on:outclick={() => (show = false)}
>
  Drag&drop your device
  {#each $devicesStore as device}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="device-item"
      draggable="true"
      class:dragged={dragged === device.id}
      on:dragstart={(event) => handleDragStart(event, device)}
      on:dragend={() => (dragged = null)}
    >
      <img
        src={deviceIcon(device.type.toString())}
        alt={device.name.toString()}
      />
      <span>{device.name}</span>
    </div>
  {/each}
</div>

<style lang="scss">
  .open-panel {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    background: rgba(213, 11, 255, 0.5);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(12.4px);
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    text-align: center;
    width: 50px;
    height: 50px;
    transition: 0.3s ease;
    cursor: pointer;
    .text {
      width: 0;
      overflow: hidden;
      font-size: 16px;
      font-weight: 600;
      transition: 0.3s ease;
      cursor: inherit;
      pointer-events: none;
    }

    .arrow {
      width: 35px;
      height: 35px;
      transition: 0.3s ease;
      cursor: inherit;
    }

    &:hover {
      width: 160px;
      border-radius: 15px;
      padding: 0 10px 0 10px;

      .text {
        width: 120px;
      }
      .arrow {
        transform: rotate(180deg);
      }
    }

    &.active {
      left: 125px;
      width: 50px;
      padding: 0;
      border-radius: 50%;
      .arrow {
        transform: rotate(180deg);
      }
      .text {
        width: 0;
      }
    }
  }
  .side-panel {
    position: relative;
    top: 50%;
    text-align: center;
    transform: translateY(-50%);
    border-radius: 0 10px 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    font-size: 13px;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
    direction: rtl;
    gap: 10px;
    width: 0;
    max-height: 600px;
    z-index: 10;
    transition: 0.3s ease;

    &.active {
      width: 120px;
      padding: 10px;
    }
    &::-webkit-scrollbar {
      width: 3px;
      border-radius: 30px;
      -webkit-appearance: none;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(224, 224, 224, 0.2) !important;
    }
    .device-item {
      background: rgba(255, 255, 255, 0.33);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10.2px);
      border: 1px solid white;
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-radius: 15px;
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      font-weight: 500;
      width: 100px;
      height: 100px;
      justify-content: space-around;
      align-items: center;
      cursor: grab;
      transition: 0.3s ease;

      &.dragged {
        background-color: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.5);
      }

      img {
        width: 40px;
        height: 40px;
      }
    }
  }
</style>
