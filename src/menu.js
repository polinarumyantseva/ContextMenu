import { Menu } from './core/menu';

export class ContextMenu extends Menu {
    constructor(selector) {
        super(selector);
        this.$menuElement = document.querySelector(selector);
    }
    open(event) {
        this.$menuElement.classList.add('open');
        
        const menuElementWidth = this.$menuElement.offsetWidth;
        const menuElementHeight = this.$menuElement.offsetHeight;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const pageX = event.pageX;
        const pageY = event.pageY;
        
        if ( (windowWidth - event.screenX) < menuElementWidth ) {
            this.$menuElement.style.left = pageX - menuElementWidth + 'px';
        } else {
            this.$menuElement.style.left = pageX + 'px';
        }

        if ( (windowHeight - event.screenY) < menuElementHeight ) {
            this.$menuElement.style.top = pageY - menuElementHeight + 'px';
        } else {
            this.$menuElement.style.top = pageY + 'px';
        }
    }

    close() {
        this.$menuElement.classList.remove('open');
    }

    add(elem) {
        this.$menuElement.innerHTML += elem;
    }

}