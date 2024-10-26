import { BackgroundModule } from './background.module';
import { AdviceModule } from './advice.module';
import { ClicksModule } from './clicks.module';

export function allModules() {
	const bgModule = new BackgroundModule('BackgroundModule', 'Поменять цвет');
	const adviceModule = new AdviceModule('AdviceModule', 'Показать сообщение');
	const clicksModule = new ClicksModule('ClicksModule', 'Считать клики');

	return [bgModule, adviceModule, clicksModule];
}
