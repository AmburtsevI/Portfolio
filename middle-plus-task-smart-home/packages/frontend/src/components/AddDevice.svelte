<script lang="ts">
  import { axiosInstance } from '../utils/http';
  import { updateDevices } from '../stores/devicesStore';

  const dataDevice = {
    name: 'Робот Пылесос',
    type: 'robot',
    params: {
      active: false,
    },
  };

  const handleAddDevice = async () => {
    try {
        const { data } = await axiosInstance.post('/device/createCustomDevice', dataDevice);
        updateDevices([data]);
    } catch (error) {
        throw error;
    }
  };
</script>

<div class="add-device">
  <button class="add-device-button" on:click={handleAddDevice}
    >Добавить устройство</button
  >
</div>

<style lang="scss">
  .add-device {
    &-button {
      background-color: rgba(213, 11, 255, 0.5);
      padding: 10px;
      border-radius: 10px;
    }
  }
</style>
