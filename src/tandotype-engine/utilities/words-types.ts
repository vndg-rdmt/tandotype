import { TDTypingUtilityConfig, TDUtils } from "../types";


export const TDWordsTypedUtility: TDUtils<TDTypingUtilityConfig> = function(settings) {
    return (config) => {
        let wordsTyped: number = 0

        const elem = new config.elementConstructor<number>({
            name:           'Words',
            defaultValue:   wordsTyped,
            elementStyling: settings.elementStyling,
            nameStyling:    settings.nameStyling,
            valueStyling:   settings.valueStyling,
        });

        let last: string = 'Enter';
        const keyCodes = new Set(['Space', 'Enter']);
        config.subscribeCallback('keydown', (e) => {
            if (keyCodes.has(e.code) && !keyCodes.has(last)) {
                elem.updateValue(++wordsTyped);
            };
            last = e.code;
        });

        return elem;
    }
}