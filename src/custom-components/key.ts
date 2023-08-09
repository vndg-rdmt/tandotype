class CustomKeys extends HTMLElement {
    public constructor(char: string) {
        super();
        this.textContent = char;
    }
}
customElements.define('keyyyy-aa', CustomKeys)
