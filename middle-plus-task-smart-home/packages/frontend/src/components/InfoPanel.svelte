<script lang="ts">
import { Toggle, Select, Label } from 'flowbite-svelte';
    import AddDevice from './AddDevice.svelte';
</script>

<div class="wrapper">
    <h1>SMART HOME</h1>
    <div class="home-section">
        
    </div>
    <div class="rooms-section">
        <AddDevice />
    </div>
</div>

<style lang="scss">
    .wrapper {
        position: relative;
        height: 80%;
        top: 50%;
        transform: translateY(-50%);
        bottom: 0;
        width: 250px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 15px;
        align-items: center;
        background: rgba(255, 255, 255, 0.33);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10.2px);
        border-radius: 15px 0 0 15px;

        h1 {
            font-size: 25px;
            font-weight: 700;
        }
    }
</style>