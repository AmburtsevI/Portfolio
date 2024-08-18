<script>
	import { onMount } from "svelte";
	import Canvas from "./Components/Canvas.svelte";
	import Core from "./Components/Core.svelte";
	import ToolsBar from "./Components/ToolsBar.svelte";

	let message = "If you close the page, the changes will not be saved";

	onMount(() => {
		const handleBeforeUnload = (event) => {
			event.preventDefault();
			event.returnValue = message;
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	});
</script>

<Core>
	<main>
		<Canvas />
		<ToolsBar />
	</main>
</Core>

<style>
	main {
		display: flex;
		height: 100vh;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}
</style>
