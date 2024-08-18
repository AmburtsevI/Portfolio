<script lang="ts">
    import SidePanel from "../components/SidePanel.svelte";
    import InfoPanel from "../components/InfoPanel.svelte";
</script>

<div class="wrapper">
    <SidePanel />
    <InfoPanel />
</div>

<style lang="scss">
    .wrapper {
        position: absolute;
        height: 100%;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>