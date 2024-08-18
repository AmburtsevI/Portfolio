<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { IHouse, IRoom } from '../../types/types';
	import { getContext } from 'svelte';
	import EditIcon from '../icons/EditIcon.svelte';
	import RemoveIcon from '../icons/RemoveIcon.svelte';

	export let data: IRoom;

	const houses = getContext<Writable<IHouse[]>>('houses');
</script>

<div class="flex justify-between items-center pl-2">
	<h2>{data.name}</h2>
</div>
