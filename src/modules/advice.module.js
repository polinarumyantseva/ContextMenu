import { Module } from '../core/module';
import adviceImg from '../img/advice-img.png';

const URL = 'https://api.adviceslip.com/advice';

export class AdviceModule extends Module {
	state = {
		advice: '',
	};

	trigger() {
		if (this.state.advice === '') {
			const $adviceBlock = document.createElement('div');
			$adviceBlock.className = 'advice';

			const $backgroundImg = document.createElement('img');
			$backgroundImg.src = adviceImg;
			$backgroundImg.className = 'advice_background';

			$adviceBlock.append($backgroundImg);
			document.querySelector('.main-container').append($adviceBlock);
			this.getAdvice($adviceBlock);

			const $newAdviceBtn = document.createElement('button');
			$newAdviceBtn.className = 'new-advice-btn';
			$newAdviceBtn.textContent = 'New advice?';
			$adviceBlock.append($newAdviceBtn);

			$newAdviceBtn.addEventListener('click', () => {
				this.getAdvice($adviceBlock);
			});
		} else {
			return -1;
		}
	}

	async getAdvice(adviceBlock) {
		try {
			const response = await fetch(URL);
			if (!response.ok) {
				throw new Error('Ошибка запроса');
			}
			this.state.advice = (await response.json()).slip.advice;
			let adviceString = adviceBlock.querySelector('#adviceString');
			let deleteBtn = adviceBlock.querySelector('.delete-btn');
			if (!adviceString) {
				adviceString = document.createElement('span');
				adviceString.id = 'adviceString';
				adviceBlock.append(adviceString);
				deleteBtn = document.createElement('button');
				deleteBtn.textContent = '+';
				deleteBtn.className = 'delete-btn';
				adviceBlock.append(deleteBtn);
			}
			adviceString.textContent = this.state.advice;
			deleteBtn.addEventListener('click', () => {
				this.state.advice = '';
				adviceBlock.remove();
			});
			this.state.advice = '';
		} catch (error) {
			console.error(error);
		}
	}
}
