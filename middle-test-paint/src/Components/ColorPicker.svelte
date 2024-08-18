<script>
	import { clickOutside } from "../utils/clickOutside";
	import { tick, onMount, getContext } from "svelte";

	export let value = "#5E7ABC";
	export let valueSecondary = "#5E7ABC";

	const color = getContext("color");
	const colorFill = getContext("colorFill");

	let values = [
		["#DAAFE9", "#C7DBF5", "#AAD5FB", "#ADE5DA", "#B0EDC3", "#FDF0A4", "#F8D6A2"],
		["#C47ADA", "#90BAEE", "#75BAFA", "#72D5BF", "#73DE8C", "#FBE66E", "#F5B969"],
		["#AE44B7", "#5E7ABC", "#5E7ABC", "#4DACA9", "#63B75A", "#EDBD4A", "#EC9740"],
		["#501B87", "#021B6B", "#0C2794", "#337277", "#2F6A52", "#AE802F", "#AD6127"],
	];

	let trigger = "Escape";
	function handleKeydown(e) {
		if (e.key == trigger) {
			dropdownActive = false;
		}
	}

	let windowHeight;
	let top;

	let dropdownActive = false;

	async function toggleDropdown(e) {
		top = true;
		dropdownActive = !dropdownActive;
	}

	function clickOutsideDropdown() {
		dropdownActive = false;
	}

	function changeValue(innerValue, typeClick) {
		if (typeClick === "primary") {
			$color = value = innerValue;
		} else {
			$colorFill = valueSecondary = innerValue;
		}

		dropdownActive = false;
	}
</script>

<svelte:window bind:innerHeight={windowHeight} on:keydown={handleKeydown} />

<div class="color-picker-holder">
	<div class="color-picker-inner">
		<button class="select-color" on:click={(e) => toggleDropdown(e)} class:fake-focus={dropdownActive}>
			<div style="display: flex;">
				<div style="background: {value};" class="color-block" />
			</div>

			<div style="display: flex;">
				<div style="background: {valueSecondary};" class="color-block" />
			</div>
			<div class="caret" class:top style="margin-right: .2rem;" />
		</button>
	</div>

	{#if dropdownActive}
		<div class:top class="values-dropdown" use:clickOutside on:click_outside={clickOutsideDropdown}>
			<div class="values-dropdown-grid">
				{#each values as val}
					{#each val as innerValue}
						<button
							class:active={innerValue == value}
							style="background: {innerValue};"
							on:contextmenu={(e) => {
								e.preventDefault(), changeValue(innerValue, "primary");
							}}
							on:click={(e) => {
								changeValue(innerValue, "secondary");
							}}
							class="color-block"
						/>
					{/each}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.color-picker-holder {
		position: relative;
	}

	.color-picker-inner {
		display: flex;
		height: 35px;
	}

	.select-color {
		border: 1px solid #ccc;
		padding: 4px;
		border-radius: 0.2rem;
		margin-right: 0.4rem;
		background: #fff;
		height: 35px;
		display: flex;
		gap: 5px;
	}

	.caret {
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-top: 4px solid #555;
		position: relative;
		top: 10px;
		margin-left: 4px;
	}

	.caret.top {
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-bottom: 4px solid #555;
		border-top: none;
	}

	.active {
		box-shadow: inset 0 0 0 1px #fff, 0 0 3px 1px rgba(0, 0, 0, 0.25);
	}

	.fake-focus,
	input:focus,
	button:focus {
		outline: 0;
		box-shadow: 0 0 0 2px #18a0fb;
		border-color: #18a0fb;
	}

	input {
		border: 1px solid #ccc;
		height: 35px;
		border-radius: 0.2rem;
	}

	.color-block {
		border-radius: 0.2rem;
		width: 24px;
		height: 24px;
		line-height: 0;
		font-size: 0;
	}

	.values-dropdown {
		padding: 1rem;
		position: absolute;
		z-index: 1;
		top: 40px;
		background: white;
		border: 1px solid #ccc;
		border-radius: 0.3rem;
	}

	.values-dropdown-grid {
		grid-template-columns: repeat(7, 24px);
		grid-template-rows: 24px 24px;
		grid-gap: 10px;
		display: grid;
	}

	.values-dropdown.top {
		top: auto;
		bottom: 40px;
	}

	.values-dropdown button {
		border: none;
	}
</style>
