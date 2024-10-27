import { Module } from '../core/module';
import clicksImg from '../img/clicks-img.jpg';

export class ClicksModule extends Module {
	#startGame = false;
	#countClick = 0;

	#render() {
		this.$container = document.createElement('div');
		this.$container.className = 'timer-game-container';
		document.querySelector('.main-container').append(this.$container);

		const $containerImg = document.createElement('div');
		$containerImg.className = 'container-img';
		this.$container.append($containerImg);

		this.$title = document.createElement('h1');
		this.$title.className = 'title';
		this.$title.textContent = 'Игра начнется через:';
		$containerImg.append(this.$title);

		this.$timer = document.createElement('h1');
		this.$timer.className = 'timer';
		$containerImg.append(this.$timer);

		this.$img = document.createElement('img');
		this.$img.src = clicksImg;
		$containerImg.append(this.$img);

		this.$button = document.createElement('button');
		this.$button.textContent = 'Повторить';
		this.$button.setAttribute('hidden', '');
		this.$button.addEventListener('click', () => {
			this.#resetGame();
			this.trigger();
		});
		this.$container.append(this.$button);
	}

	#resetGame() {
		this.$container.remove();
		this.#countClick = 0;
	}

	#customTimer(element, timeMs) {
		return new Promise((resolve) => {
			let timeS = timeMs / 1000;
			element.textContent = timeS;

			const interval = setInterval(() => {
				timeS -= 1;
				element.textContent = timeS;

				if (timeS < 0) {
					clearInterval(interval);
					resolve();
				}
			}, 1000);
		});
	}

	#toggleClass() {
		this.$img.classList.toggle('active');
	}

	#handleClick(typeEvent) {
		if (typeEvent === 'down') {
			if (this.#startGame) {
				this.#countClick += 1;
			}
			this.#toggleClass();
		} else {
			this.#toggleClass();
		}
	}

	trigger() {
		this.#render();

		const handleMouseDown = this.#handleClick.bind(this, 'down');
		const handleMouseUp = this.#handleClick.bind(this, 'up');

		document.body.addEventListener('mousedown', handleMouseDown);
		document.body.addEventListener('mouseup', handleMouseUp);

		this.#customTimer(this.$timer, 3000)
			.then(() => {
				this.#startGame = true;
				this.$title.textContent = 'Кликай как можно быстрее';
				return this.#customTimer(this.$timer, 5000);
			})
			.then(() => {
				this.#startGame = false;
				this.$title.textContent = 'Твой результат:';
				this.$timer.textContent = this.#countClick;
				this.$button.toggleAttribute('hidden');

				document.body.removeEventListener('mousedown', handleMouseDown);
				document.body.removeEventListener('mouseup', handleMouseUp);
			});
	}
}
