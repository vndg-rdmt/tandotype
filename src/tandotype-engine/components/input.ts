import { TDEventSubsribeCallback, TDTypingEventType } from "../types";

export interface TDInputComponentConfig {
    inputAreaStyle: string,
    typingSubsribeCallback: TDEventSubsribeCallback<TDTypingEventType, KeyboardEvent>,
}

export class TDInputComponent extends HTMLElement {
    public constructor(config: TDInputComponentConfig) {
        super();
        let counter = 0;
        const elem = document.createElement('input');
        this.style.width = '100%'
        elem.type = 'text'
        elem.className = config.inputAreaStyle;
        elem.style.resize = 'none';
        elem.spellcheck = false;
        window.addEventListener('click', () => elem.focus())
        window.addEventListener('load', () => elem.focus())
        window.addEventListener('keypress', (e) => {
            if (e.code === 'Enter') {
                elem.value = ''
            }
        });
        this.appendChild(elem)
    }
}

customElements.define('td-input-element', TDInputComponent);