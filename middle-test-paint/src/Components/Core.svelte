<script>
    import { setContext } from "svelte";
	import { writable } from "svelte/store";

    const currentTool = writable('pen');
    const image = writable()
    const canvas = writable()
    const color = writable('#5E7ABC')
    const colorFill = writable('#5E7ABC')
    const size = writable(1)

    setContext('currentTool', currentTool);
    setContext('image', image)
    setContext('canvas', canvas)
    setContext('color', color)
    setContext('colorFill', colorFill)
    setContext('size', size)
</script>

<slot />