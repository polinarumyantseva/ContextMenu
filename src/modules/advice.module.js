import { Module } from '../core/module';

const URL = 'https://api.adviceslip.com/advice';

export class AdviceModule extends Module {
    state = {
        advice: '',
    };

    trigger() {    
        const $adviceBlock = document.createElement('div');
        $adviceBlock.className = 'advice';

        const $loader = document.createElement('span');
        $loader.textContent = 'Loading ...';
        $loader.id = 'loader';
        $loader.setAttribute('hidden', '');
        $adviceBlock.append($loader);
        document.body.append($adviceBlock);
        this.getAdvice($adviceBlock);
    }

    async getAdvice($adviceBlock) {
        try {
            this.#toggleLoader();
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }
            this.state.advice = (await response.json()).slip.advice; 
            console.log(this.state.advice); 
            const adviceString = document.createElement('span');
            adviceString.textContent = this.state.advice;
            adviceString.className = 'advice-string';
            $adviceBlock.append(adviceString);
        } catch (error) {
            console.error(error);
        } finally {
            this.#toggleLoader();
            console.log('Запрос выполнен');
            setTimeout(() => {
                $adviceBlock.remove();
            }, 10000); 
        }
    }

    #toggleLoader() {
        const $loader = document.querySelector('#loader');
        const isHidden = $loader.hasAttribute('hidden');
        if (isHidden) {
            $loader.removeAttribute('hidden');
        } else {
            $loader.setAttribute('hidden', '');
        }
    }
}