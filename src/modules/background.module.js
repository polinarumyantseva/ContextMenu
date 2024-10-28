import { Module } from '../core/module';
import { getRandomColor, random } from '../utils';

export class BackgroundModule extends Module {
	trigger() {
		const firstColor = getRandomColor();
		const secondColor = getRandomColor();
		const randomGradientNumber = random(0, 360);

		const $colorBlock = document.createElement('div');
		$colorBlock.className = 'color-block';
		document.querySelector('.main-container').append($colorBlock);

		$colorBlock.style.background = `linear-gradient(${randomGradientNumber}deg, ${firstColor}, ${secondColor})`;
	}
}
