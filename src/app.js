import './styles.css';
import { ContextMenu } from './menu';
import { BackgroundModule } from './modules/background.module';

document.addEventListener('DOMContentLoaded', () => {
    const contextMenu = new ContextMenu('#menu');

    // Пример добавления модуля
    const bgModule = new BackgroundModule('bgModule', 'Поменять цвет');
    contextMenu.add(bgModule.toHTML());

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        contextMenu.open(e);
    });
})

