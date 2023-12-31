import { TDTypingUtilityConfig, TDUtils } from "../types";


export const TDTapsCounterUtility: TDUtils<TDTypingUtilityConfig> = function(settings) {
    return (config) => {
        let charsTyped: number = 0

        const elem = new config.elementConstructor<number>({
            name:           'Taps',
            defaultValue:   charsTyped,
            elementStyling: settings.elementStyling,
            nameStyling:    settings.nameStyling,
            valueStyling:   settings.valueStyling,
        });

        config.subscribeCallback('keydown', (e) => {
            return !e.repeat ? elem.updateValue(charsTyped++) : undefined;
        });

        return elem;
    }
}