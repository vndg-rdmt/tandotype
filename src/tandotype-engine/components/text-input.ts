
export interface TDInputConfig {
    inputStyle:     string,
    textStyle:      string,
    paragrapthStle: string,
}

export class TDTypingInput extends HTMLElement {
    public constructor(config: TDInputConfig) {
        super();
        this.className = config.inputStyle;
    }
}
customElements.define('td-typing-input', TDTypingInput)