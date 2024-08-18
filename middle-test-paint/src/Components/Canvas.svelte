<script>
	import { getContext, onMount, setContext } from "svelte";

	const currentTool = getContext("currentTool");
	const image = getContext("image");
	const canvasContext = getContext("canvas");
	const color = getContext("color");
	const colorFill = getContext("colorFill");
	const size = getContext("size");

	let canvas;
	let resizer;
	let ctx;
	let lastX;
	let lastY;
	let isDrawing = false;
	let props = [];
	let width = 1280;
	let height = 720

	onMount(() => {
		ctx = canvas.getContext("2d");
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		$canvasContext = canvas;
	});

	const resize = () => {

		const imageNode = canvas.toDataURL("image/png");

		width = canvas.width;
		height = canvas.height;

		canvas.width = resizer.offsetWidth;
		canvas.height = resizer.offsetHeight;

		const ctxn = canvas.getContext("2d");
		ctxn.fillStyle = "white";
		

		const img = new Image();
		img.src = imageNode;
		img.onload = () => {
			ctxn.fillRect(0, 0, width, height);
			ctxn.drawImage(img, 0, 0, canvas.width,  canvas.height);
		};
	};

	$: if ($currentTool === "clear") {
		props = [];
		$image = "";
	}

	const handleMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
		isDrawing = true;

		lastX = event.clientX - canvas.offsetLeft;
		lastY = event.clientY - canvas.offsetTop;
		ctx.lineWidth = $size;

		const prop = {
			startX: event.clientX - canvas.offsetLeft,
			startY: event.clientY - canvas.offsetTop,
			endX: event.clientX - canvas.offsetLeft,
			endY: event.clientY - canvas.offsetTop,
			type: $currentTool,
		};
		props.push(prop);
	};

	const handleMouseMove = (event) => {
		if (!isDrawing) return;

		ctx.fillStyle = $colorFill;
		ctx.strokeStyle = $color;

		const prop = props[props.length - 1];
		prop.endX = event.clientX - canvas.offsetLeft;
		prop.endY = event.clientY - canvas.offsetTop;

		if ($currentTool === "pen" || $currentTool === "eraser") {
			drawPen(event, $currentTool);
		} else if ($currentTool === "rectangle") {
			drawRectangle();
		} else if ($currentTool === "triangle") {
			drawTriangle();
		} else if ($currentTool === "line") {
			drawLine();
		} else if ($currentTool === "circle") {
			drawCircle();
		} else if ($currentTool === "clear") {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
	};

	const drawRectangle = () => {
		const img = new Image();
		img.src = $image;
		img.onload = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, width, height);

			props
				.filter((prop) => prop.type === "rectangle")
				.forEach((rect) => {
					const width = rect.endX - rect.startX;
					const height = rect.endY - rect.startY;

					ctx.fillRect(rect.startX, rect.startY, width, height);
					ctx.strokeRect(rect.startX, rect.startY, width, height);
				});
		};
	};

	const drawPen = (event, type) => {
		const img = new Image();
		img.src = $image;
		img.onload = () => {
			const x = event.clientX - canvas.offsetLeft;
			const y = event.clientY - canvas.offsetTop;
			ctx.lineCap = "round";

			ctx.strokeStyle = type === "pen" ? $color : "#fff";

			ctx.beginPath();
			ctx.moveTo(lastX, lastY);
			ctx.lineTo(x, y);
			ctx.fill();
			ctx.stroke();
			ctx.closePath();

			lastX = x;
			lastY = y;
		};
	};

	const drawTriangle = () => {
		const img = new Image();
		img.src = $image;
		img.onload = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, width, height);

			props
				.filter((prop) => prop.type === "triangle")
				.forEach((rect) => {
					const width = rect.endX - rect.startX;
					const height = rect.endY - rect.startY;
					ctx.strokeStyle = $color;
					ctx.beginPath();
					ctx.moveTo(rect.startX, rect.startY);
					ctx.lineTo(rect.startX + width, rect.startY);
					ctx.lineTo(rect.startX + width / 2, rect.startY + height);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
				});
		};
	};

	const drawLine = () => {
		const img = new Image();
		img.src = $image;
		img.onload = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, width, height);

			props
				.filter((prop) => prop.type === "line")
				.forEach((line) => {
					ctx.beginPath();
					ctx.moveTo(line.startX, line.startY);
					ctx.lineTo(line.endX, line.endY);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
				});
		};
	};

	const drawCircle = () => {
		const img = new Image();
		img.src = $image;
		img.onload = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, width, height);

			props
				.filter((prop) => prop.type === "circle")
				.forEach((line) => {
					const width = line.endX - line.startX;
					const height = line.endY - line.startY;
					const radius = Math.sqrt(Math.abs(width * width) + Math.abs(height * height));
					ctx.beginPath();
					ctx.arc(line.startX, line.startY, radius, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
				});
		};
	};

	const handleMouseUp = () => {
		$image = canvas.toDataURL("image/png");
		const img = new Image();
		img.src = $image;
		img.onload = () => {
			ctx.drawImage(img, 0, 0, width, height);
		};

		isDrawing = false;
	};
</script>

<div class="resizer" bind:this={resizer} on:mouseup={resize}>
	<canvas
		width={width}
		height={height}
		bind:this={canvas}
		on:mousedown={handleMouseDown}
		on:mousemove={handleMouseMove}
		on:mouseup={handleMouseUp}
		on:contextmenu={drawRectangle}
		id="canvas"
	/>
</div>

<style lang="scss">
	.resizer {
		resize: both;
		width: 1280px;
		height: 720px;
		box-sizing: border-box;
		// border: 2px solid black;
		overflow: hidden;

		#canvas {
			background-color: white;
			z-index: 1;
		}
	}
</style>
