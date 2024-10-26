import { Module } from '../core/module';

export class BackgroundModule extends Module {
	trigger() {
		document.body.style.backgroundColor = this.#getRandomColor();
	}

	#getRandomColor() {
		const letters = '0123456ABCDEFD';
		let color = '#';

		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}

		return color;
	}
}
