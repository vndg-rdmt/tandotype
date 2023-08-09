import { TDUtilityComponent, TDUtilityElementConfig } from "./application/utility-component";

/**
 * #### Keys alphabet bindings for user's language.
 * `default` value is used, when alphabet for current
 * user's language is not provided, so it's essential
 * property to be specified.
 * 
 * #### Effects
 * - Specified locales becomes available to see
 * at the app creditals as an available languages
 * - Locales are set automatically according to
 * user's current language and also dynamically
 * changed
 * 
 * #### Example:
 * ```ts
 * const locales: KeysLocales = new Map([
 *   ['default', 'abcde'.split('')],
 *   ['en',      'abcde'.split('')],
 *   ['ru',      'абвгд'.split('')],
 * ]);
 * ```
 */
export type KeysLocales = Map<string, string[]>

export type TypingEventType = 'keyup' | 'keydown' | 'keypress';

export type TDEventSubsribeCallback<T extends string, E extends Event> = (eventType: T, callback: (e:E) => void) => void

export interface TandotypeConfig {
    keysLocales: KeysLocales;  
    cssClasses: {
        app:            string,
        keyboard:       string,
        keybutton:      string,
        keypressed:     string,
        utilityBlock:   string,
        utilityText:    string,
    };
}

export interface TDUtilityConfig {
    elementConstructor: new(config: TDUtilityElementConfig) => TDUtilityComponent;
    subscribeCallback: TDEventSubsribeCallback<TypingEventType, KeyboardEvent>;
}

export type TDUtility = (config: TDUtilityConfig) => HTMLElement;