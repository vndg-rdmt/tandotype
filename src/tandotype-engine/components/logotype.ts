export class TDLogotypeElement extends HTMLElement {
    constructor(text: string) {
        super();
        this.style.position = 'absolute';
        this.style.color = 'white';
        this.style.position = 'absolute';
        this.style.top = '0px';
        this.style.left = '0px';
        this.style.width = '140px';
        this.style.overflow = 'hidden';
        this.style.height = '140px';
        this.style.textAlign = 'center';

        this.appendChild(this.getBadge()).textContent = text
    }

    private getBadge(): HTMLElement {
        const badge = document.createElement('div');
        badge.style.position = 'absolute';
        badge.style.backgroundColor = 'red';
        badge.style.textAlign = 'center';
        badge.style.rotate = '-45deg';
        badge.style.minWidth = '200px';
        badge.style.top = '30px';
        badge.style.left = '-50px';
        badge.style.padding = '7px';
        badge.style.fontWeight = '600';
        badge.style.fontSize = '17px';
        return badge;
    }
}

customElements.define('td-logotype-element', TDLogotypeElement);