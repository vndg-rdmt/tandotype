import { TDUtilityComponent } from "./application/utility-component";


// MARK: td-events
export interface empty_eventy {}
// SUBMARK: events-types
export type TDTypingEventType = 'keyup' | 'keydown' | 'keypress';
export type TDTimeEventType = 'min' | 'sec' | 'anim';



// MARK: utilites
/**
 * Function that subscribes callback to specified event
 * from td-event-dispatchers.
 */
export interface TDUtilityElementConfig<T> {
    name:           string,
    defaultValue:   T,
    elementStyling: string,
    nameStyling:    string,
    valueStyling:   string,
}
export type TDEventSubsribeCallback<TDEv extends string, E extends any> = (eventType: TDEv, callback: (e:E) => void) => void;
export type TDTypingEventSub = TDEventSubsribeCallback<TDTypingEventType, KeyboardEvent>;
export type TDTimerEventSub  = TDEventSubsribeCallback<TDTimeEventType, empty_eventy>;

/**
 * Utlity configuration, which passed as an argument
 * so the app-engine can manage itself, how to assemble
 * utility properly, based on the utility type.
 */
export interface TDUtilityConfig<SBC extends TDEventSubsribeCallback<any, any>> {
    elementConstructor: new<T extends any>(config: TDUtilityElementConfig<T>) => TDUtilityComponent<T>;
    subscribeCallback: SBC;
};
// SUBMARK: defined utility config variations
export type TDTypingUtilityConfig = TDUtilityConfig<TDTypingEventSub>;
export type TDTimerUtilityConfig  = TDUtilityConfig<TDTimerEventSub>;

/**
 * Utility itself.
 * Utility represented as a function, which receives {@link TDUtilityConfig}
 * and returns setted up {@link TDUtilityComponent}, with already
 * defined config and event-responce-logic.
 */
export type TDUtility<T extends TDUtilityConfig<TDEventSubsribeCallback<any, any>>> = (config: T) => TDUtilityComponent<any>;


// MARK: app-engine
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
export type KeysLocales = Map<string, string[]>;

export type TDUtilityLoader<T extends TDUtility<TDUtilityConfig<TDEventSubsribeCallback<any, any>>>> = (...utilities: T[]) => void

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
};

export interface TDUtilitySettings {
    elementStyling: string,
    nameStyling:    string,
    valueStyling:   string,
}

export type TDUtils<T extends TDUtilityConfig<any>> = (settings: TDUtilitySettings) => TDUtility<T>