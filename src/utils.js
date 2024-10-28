export function random(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export function getRandomColor() {
	const letters = '0123456ABCDEFD';
	let color = '#';

	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 14)];
	}

	return color;
}
