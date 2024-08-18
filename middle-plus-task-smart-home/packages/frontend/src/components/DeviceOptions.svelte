<script lang="ts">
  import { Toggle, Select, Label, Range } from 'flowbite-svelte';
  import type { device } from '../types/types';
  import { getAllRooms } from '../utils/house';
  import { onMount } from 'svelte';
  import { deviceInterfaces, interfaceTranslation, ranges } from '../utils/devices';
  import { socket } from '../utils/socket';

  export let device: device;

  let value = false;
  let selectedRoom: number;
  let rooms: { name: string; value: string }[] = [];
  const { params, name, id, type, room } = device;

  const settings = {
    name: '',
    params: { ...params },
    roomId: 0,
  };
  let deviceSettings = deviceInterfaces(type.toString());

  const getRoomData = async () => {
    const allRooms = await getAllRooms();
    rooms = allRooms.map((room: Record<string, any>) => ({
      name: room.name,
      value: room.id,
    }));
  };

  const handleChangeParams = () => {
    if (typeof params === 'object' && params !== null) {
      socket.emit('update', { id, params, name, room });
    }
  };

  onMount(() => {
    getRoomData();
  });

  $: console.log(Object.entries(deviceSettings));
</script>

<div class="wrapper">
  {name}
  <div class="room-select">
    <Label class="text-white-900">
      Комната
      <Select
        size="sm"
        class="p-1 h-7"
        items={rooms}
        bind:value={settings.roomId}
        placeholder="Room choice"
      />
    </Label>
  </div>
  {#each Object.entries(deviceSettings) as [key, value]}
    {#if typeof value === 'boolean'}
      <div class="option">
        <Toggle
          class=""
          color="purple"
          bind:checked={settings.params[key]}
          on:change={handleChangeParams}
        />
        {interfaceTranslation[key]}
      </div>
    {:else if typeof value === 'number'}
      <div class="option range">
        <div class="option text">
          <span>{interfaceTranslation[key]}</span>
          <span>{value}</span>
        </div>
        <Range bind:value={settings.params[key]} min={ranges[key].min} max={ranges[key].max}/>
      </div>
    {/if}
  {/each}
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    gap: 15px;
    height: fit-content;

    .room-select {
      margin-bottom: 5px;
    }

    .option {
      display: flex;
      width: 100%;
      
      &.text {
        justify-content: space-between;
      }

      &.range {
        flex-direction: column;
        gap: 5px;
      }
    }
  }
</style>
