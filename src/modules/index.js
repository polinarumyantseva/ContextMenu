import { BackgroundModule } from './background.module';
import { AdviceModule } from './advice.module';

export function allModules () {
    const bgModule = new BackgroundModule('BackgroundModule', 'Поменять цвет');
    const adviceModule = new AdviceModule('AdviceModule', 'Показать сообщение');

    return [bgModule, adviceModule];
}
