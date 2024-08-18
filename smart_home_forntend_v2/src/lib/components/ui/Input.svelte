<script lang="ts">
	import { onMount } from 'svelte'

	export let value: string
	export let placeholder: string = ''
	export let defaultValue: string = ''

	onMount(() => {
		if (defaultValue) {
			value = defaultValue
		}
	})
</script>

<div class="input-group grid-cols-[auto_1fr_auto] rounded-container-token">
	<input
		bind:value
		type="text"
		{placeholder}
		class="bg-transparent border-0 ring-0 p-2 focus-visible:outline-none"
	/>
</div>
