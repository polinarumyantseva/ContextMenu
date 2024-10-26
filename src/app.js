import './styles.css';
import { ContextMenu } from './menu';
import { allModules } from './modules/index';

document.addEventListener('DOMContentLoaded', () => {
    const contextMenu = new ContextMenu('#menu');
    const $menuElement = document.querySelector('#menu');
    const modules = allModules();

    modules.forEach((module) => {
        contextMenu.add(module.toHTML());
    });

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        contextMenu.open(e);
    });
    
    $menuElement.addEventListener('click', (e) => {
        e.stopPropagation();
        const { target } = e;
        
        if (target.tagName === 'LI') {
            const moduleName = target.dataset.type;

            modules.forEach((item) => {
                if(item.type === moduleName) item.trigger()
            });
        }
    })
})

