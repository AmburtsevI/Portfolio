<script>
	import toolsData from "../utils/toolsData";
	import { getContext } from "svelte";
	import ColorPicker from "./ColorPicker.svelte";

	const currentTool = getContext("currentTool");
	const canvas = getContext("canvas");
	const color = getContext("color");

	const size = getContext("size");

	let tooltip = "";

	const onClick = (tool) => {
		$size = 1;
		if (tool === "clear") {
			const ctx = $canvas.getContext("2d");
			ctx.clearRect(0, 0, $canvas.width, $canvas.height);
		}
		$currentTool = tool;
	};

	const onHover = (text) => {
		tooltip = text;
	};

	const download = () => {
		const link = document.createElement("a");
		link.download = "image.png";
		link.href = $canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
		link.click();
	};
</script>

<div class="wrapper">
	<div class="tooltip">{tooltip}</div>
	<div class="toolbar">
		<div class="tools">
			{#each toolsData as tool}
				<img
					src={tool.svg}
					on:click={() => onClick(tool.name)}
					on:mouseenter={() => onHover(tool.text)}
					on:mouseleave={() => onHover("")}
				/>
			{/each}

			<ColorPicker />
		</div>
		<div class="options">
			<input type="range" bind:value={$size} min="1" max="20" />
			<div class="size">{$size}</div>
		</div>
	</div>

	<div class="save">
		<button on:click={download}>Save</button>
	</div>
</div>

<style lang="scss">
	.tooltip {
		position: absolute;
		bottom: 60px;
	}

	.wrapper {
		width: fit-content;
		height: 80px;
		position: absolute;
		bottom: 0;
		border-radius: 15px 15px 0 0;
		padding: 15px 15px 0 15px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		gap: 20px;

		.save {
			border-radius: 15px 15px 0 0;
			padding: 10px 15px 0 15px;
			width: 80px;
			height: 80px;
			background-color: #ececec;
			display: flex;
			justify-content: center;
			align-items: center;

			button {
				width: 60px;
				height: 40px;
			}
		}
	}
	.toolbar {
		border-radius: 15px 15px 0 0;
		padding: 15px 15px 0 15px;
		background-color: #ececec;
		.tools {
			width: fit-content;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			gap: 5px;

			img {
				width: 40px;
				height: 40px;
				transition: 0.3s ease;

				&:hover {
					transform: scale(1.2);
				}
			}
		}

		.options {
			margin-top: 10px;
			display: flex;
			gap: 5px;
			justify-content: center;
			box-sizing: border-box;

			input[type="range"] {
				background-color: black;
			}
			input[type="range"]::-webkit-slider-runnable-track {
				background-color: black;
				height: 0.4rem;
				border-radius: 10px;
			}

			input[type="range"]::-webkit-slider-thumb {
				margin-top: -5px;
				background-color: #101011;
				height: 2rem;
				width: 1rem;
			}

			.size {
				color: black;
				font-size: 16px;
				font-weight: 500;
			}
		}
	}
</style>
