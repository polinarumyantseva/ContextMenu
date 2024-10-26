import { Module } from '../core/module';


const URL = 'https://api.adviceslip.com/advice';

export class AdviceModule extends Module {
    state = {
        advice: '',
    };

	
    trigger() {
		if(this.state.advice === ''){
        const adviceBlock = document.createElement('div');
        adviceBlock.className = 'advice';
		const backgroundImg = document.createElement('img');
		backgroundImg.src = 'src/img/kisspng-freddy-krueger-sticker-telegram-fedora-illustratio-freddy-krueger-telegram-sticker-5cef0b840ada67.9085809715591699240445.png';
		backgroundImg.className = 'advice_background';
		adviceBlock.append(backgroundImg)
        document.body.append(adviceBlock);
        this.getAdvice(adviceBlock);
		const newAdviceBtn = document.createElement('button');
		newAdviceBtn.className = 'new-advice-btn';
		newAdviceBtn.textContent = 'New advice?'
		adviceBlock.append(newAdviceBtn);
		newAdviceBtn.addEventListener('click', ()=>{
			this.getAdvice(adviceBlock);
		})
	} else {
		return -1
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
        } catch (error) {
            console.error(error);
        }
    }

}