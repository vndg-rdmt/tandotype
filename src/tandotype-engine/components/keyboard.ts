import { KeysLocales, TDEventSubsribeCallback, TDTypingEventType } from "../types";


export interface KeyboardComponentConfig {
    /**
     * @deprecated
     */
    localesMapping?:  KeysLocales;
    keybuttonStyle:  string;
    keyboardStyle:   string;
    keypressedStyle: string
    /**
     * @depricated 
     */
    listenLanguageChanges?: (callback: (lang: string) => void) => void;
    typingSubsribeCallback: TDEventSubsribeCallback<TDTypingEventType, KeyboardEvent>;
}

/**
 * Keyboard sync html component.
 * 
 * Consists of keys of provided alphabet
 * and responces to languages changes.
 */
export class TDKeyboardComponent extends HTMLElement {

    private static readonly KeyboardLayout: string[][] = [
        ['Backquote', ...this.getCharCodes('1234567890', 'Digit'), 'Minus','Equal','Backspace'],
        ['Tab',       ...this.getCharCodes('qwertyuiop', 'Key'), 'BracketLeft', 'BracketRight', 'Backslash'],
        ['CapsLock',  ...this.getCharCodes('asdfghjkl', 'Key'),'Semicolon', 'Quote', 'Enter'],
        ['ShiftLeft', ...this.getCharCodes('zxcvbnm', 'Key'), 'Comma', 'Period', 'Slash', 'ShiftRight'],
        ['ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight'],
    ];

    private static DefaultStyling: Map<string, ((e: HTMLElement) => void)> = new Map([
        ['Backspace', (e) => {e.style.flex = '1.6'}],
        ['Tab', (e) => {e.style.flex = '1.4'}],
        ['CapsLock', (e) => {e.style.flex = '1.8'}],
        ['Enter', (e) => {e.style.flex = '1.8'}],
        ['ShiftLeft', (e) => {e.style.flex = '2.5'}],
        ['ShiftRight', (e) => {e.style.flex = '2.5'}],
        ['ControlLeft', (e) => {e.style.flex = '2'}],
        ['AltLeft', (e) => {e.style.flex = '2'}],
        ['MetaLeft', (e) => {e.style.flex = '2'}],
        ['Space', (e) => {e.style.flex = '10'}],
        ['MetaRight', (e) => {e.style.flex = '3'}],
        ['AltRight', (e) => {e.style.flex = '3'}],
    ])

    private static getCharCodes(alhpabet: string, prefix: string): string[] {
        return alhpabet.split('').map(char => prefix + char.toUpperCase());
    }

    public constructor(config: KeyboardComponentConfig) {
        super();
        this.createKeyboardTypingCallback = this.createKeyboardTypingCallback.bind(this);
        this.getLanguageUpdateDelegate    = this.getLanguageUpdateDelegate.bind(this);
        this.updateKeys                   = this.updateKeys.bind(this);
        this.className                    = config.keyboardStyle;

        this.getLanguageUpdateDelegate(
            TDKeyboardComponent.KeyboardLayout,
            config.keybuttonStyle,
        )();

        config.typingSubsribeCallback(
            'keydown', this.createKeyboardTypingCallback(config.keypressedStyle, 'add'));

        config.typingSubsribeCallback(
            'keyup', this.createKeyboardTypingCallback(config.keypressedStyle, 'remove'));
        
        this.assignAdditionalKeys();
    }

    /**
     * Mapping for currently rendered alphabet
     * as a key's 'code' -> 'element-for-key'.
     */
    private existingKeysHolder: Map<string, HTMLElement> = new Map();

    /**
     * Creates a new function which looks up if keyboard-component
     * has element in its own alphabet for the pressed key and animates button.
     * 
     * Callback looks up for key's `code`, because of 
     * the fact that when user, for example, holds 'shift', key is value
     * is modified, so 'q' becomes 'Q'. Keyboard can also have left and right
     * variants of the same key, like ShiftLeft and ShiftRight, that's why
     * keyElement cannot be 100% determined with `KeyboardEvent.key`,
     * but with `KeyboardEvent.code` value.
     */
    private createKeyboardTypingCallback(elemStyling: string, modifierName: 'add' | 'remove') {
        return (e: KeyboardEvent) => {
            const elem = this.existingKeysHolder.get(e.code);
            if (elem != undefined && !e.repeat) elem.classList[modifierName](elemStyling);
        }
    }

    /**
     * Because of the fact, that not all user keyboard keys layout can
     * not be assigned to the pattern, some keyboard-keys need to be
     * assigned to a different codes, like `Backquote` and `Escape`,
     * bacause some layouts assign this codes to the same physical button,
     * like on cidoo, or have escape button placed to the `F-keys row`
     * like on Macs, so the ui elements must be assigned to a few codes.
     * 
     * If you don't do that, some keys may stay unused in some situations,
     * so this function balaces layout difference to make UX stable for users.
     * 
     * Balancing-mapping may not contain many balancing keys now,
     * but it's addded to scalability and feature issues, so
     * the assosiated problems can be solved faster.
     */
    private assignAdditionalKeys(): void {
        for (const [key, values] of this.keysBalancingMapping) {
            const buttonReference = this.existingKeysHolder.get(key)!;
            values.forEach((codeName: string) => this.existingKeysHolder.set(codeName, buttonReference))
        }
    }

    private keysBalancingMapping: Map<string, string[]> = new Map([
        ['Backquote', ['Escape']],
    ]);

    /**
     * Updates keyboard-keys elements
     * to the specified alphabet.
     */
    private updateKeys(charsAlphabet: string[][], keyCSSStyling: string): void {
        this.innerHTML = '';
        this.existingKeysHolder.clear();
        
        for (let i = 0; i < charsAlphabet.length; i++) {
            const row = this.appendChild(this.getKeysRowHTMLElement());
            row.append(
                ...charsAlphabet[i].map(char => {
                    const keyElement = this.getKeyHTMLElement(keyCSSStyling);
                    const styleCallback = TDKeyboardComponent.DefaultStyling.get(char);
                    styleCallback ? styleCallback(keyElement) : ((e: HTMLElement) => {e.style.flex = '1'})(keyElement);
                    this.existingKeysHolder.set(char, keyElement);
                    return keyElement;
                })
            );
        };
    }

    /**
     * Creates new html element for character-key
     */
    private getKeyHTMLElement(className: string): HTMLElement {
        const node = document.createElement('div');
        node.className = className;
        return node;
    }

    private getKeysRowHTMLElement(): HTMLElement {
        const node = document.createElement('div');
        node.style.display        = 'flex';
        node.style.flexDirection  = 'row';
        node.style.justifyContent = 'center';
        node.style.alignItems     = 'center';
        return node;
    }

    /**
     * Create delegate callback for user-language-dispatcher
     * which updates keyboard-component keys on language change.
     * 
     * Different Languages is now marked as depricated feature,
     * it will be supported at newest versions.
     */
    private getLanguageUpdateDelegate(localesMap: string[][], keyCSSStyling: string) {
        return () => this.updateKeys(
            localesMap,
            keyCSSStyling,
        );
    }
}
customElements.define('tdkeyboard-component', TDKeyboardComponent)