import { KeysLocales, TDEventSubsribeCallback, TDTypingEventType } from "../types";


export interface KeyboardComponentConfig {
    localesMapping:  KeysLocales;
    keybuttonStyle:  string;
    keyboardStyle:   string;
    keypressedStyle: string
    listenLanguageChanges: (callback: (lang: string) => void) => void;
    typingSubsribeCallback: TDEventSubsribeCallback<TDTypingEventType, KeyboardEvent>;
}

/**
 * Keyboard sync html component.
 * 
 * Consists of keys of provided alphabet
 * and responces to languages changes.
 */
export class TDKeyboardComponent extends HTMLElement {
    public constructor(config: KeyboardComponentConfig) {
        super();
        this.createKeyboardTypingCallback = this.createKeyboardTypingCallback.bind(this);
        this.updateKeys             = this.updateKeys.bind(this);
        this.className              = config.keyboardStyle;
        
        config.listenLanguageChanges(
            this.getLangDelegate(
                config.localesMapping,
                config.keybuttonStyle,
            )
        );

        config.typingSubsribeCallback(
            'keydown', this.createKeyboardTypingCallback(config.keypressedStyle, 'add'));

        config.typingSubsribeCallback(
            'keyup', this.createKeyboardTypingCallback(config.keypressedStyle, 'remove'));
    }

    /**
     * Mapping for currently rendered alphabet
     * as a 'char' -> 'element-for-char'.
     */
    private existingKeysHolder: Map<string, HTMLElement> = new Map();

    /**
     * Creates a new function which looks up if keyboard-component
     * has element in its own alphabet for the pressed key and animates button.
     */
    private createKeyboardTypingCallback(elemStyling: string, modifierName: 'add' | 'remove') {
        return (e: KeyboardEvent) => {
            const elem = this.existingKeysHolder.get(e.code);
            if (elem != undefined && !e.repeat) elem.classList[modifierName](elemStyling)
        }
    }

    /**
     * Updates keyboard-keys elements
     * to the specified alphabet.
     */
    private updateKeys(charsAlphabet: string[], keyCSSStyling: string): void {
        this.innerHTML = '';
        this.existingKeysHolder.clear();
        this.append(...charsAlphabet.map<HTMLElement>(
            (char: string) => {
                const keyElement = this.getKeyHTMLElement(char, keyCSSStyling);
                this.existingKeysHolder.set('Key' + char.toLocaleUpperCase(), keyElement);
                return keyElement;
            })
        );
    }

    /**
     * Creates new html element for character-key
     */
    private getKeyHTMLElement(char: string, className: string): HTMLElement {
        const node = document.createElement('div');
        node.textContent = char;
        node.className = className;
        return node;
    }

    /**
     * Create delegate callback for user-language-dispatcher
     * which updates keyboard-component keys on language change.
     */
    private getLangDelegate(localesMapping: KeysLocales, keyCSSStyling: string) {
        const ctx = this;
        return (lang: string) => ctx.updateKeys(
            localesMapping.get(lang) || localesMapping.get('default')!,
            keyCSSStyling,
        );
    }
}
customElements.define('tdkeyboard-component', TDKeyboardComponent)