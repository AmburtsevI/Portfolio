export const drawFunctions = (tool, event, ctx, canvas, lastX, lastY, props) => {
	const filteredProps = props.filter((prop) => prop.type === tool);
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	const actions = {
		rectangle: () => {
			event.preventDefault();
			event.stopPropagation();

			props.forEach((rect) => {
				const width = rect.endX - rect.startX;
				const height = rect.endY - rect.startY;

				ctx.strokeRect(rect.startX, rect.startY, width, height);
			});
		},
		line: () => {
			event.preventDefault();
			event.stopPropagation();

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			props.forEach((line) => {
				ctx.beginPath();
				ctx.moveTo(line.startX, line.startY);
				ctx.lineTo(line.endX, line.endY);
				ctx.stroke();
			});
		},
		triangle: () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		},
	};

	return actions[tool]?.();
};
