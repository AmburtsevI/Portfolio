<script lang="ts">
    import Interface from "./Interface.svelte";
    import Floor from "./Floor.svelte";
</script>

<div class="wrapper">
    <Interface />
    <Floor />
</div>

<style lang="scss">
    .wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>