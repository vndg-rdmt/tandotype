import { TDTimerUtilityConfig, TDUtils } from "../types";


export const TDCPMUtility: TDUtils<TDTimerUtilityConfig> = function(settings) {
    return (config) => {
        let charsTyped: number = 0

        const elem = new config.elementConstructor<number>({
            name:           'CPM',
            defaultValue:   charsTyped,
            elementStyling: settings.elementStyling,
            nameStyling:    settings.nameStyling,
            valueStyling:   settings.valueStyling,
        });

        let start: number = performance.now();
        let words_counter: number = 0;
        window.addEventListener('keypress', (e) => {
            words_counter += +(!e.repeat && (e.code.startsWith('Key') || e.code.startsWith('Digit')));
        })
        config.subscribeCallback('anim', () => {
            elem.updateValue(
                Math.ceil(words_counter / (performance.now() - start) * 1000 * 60)
            );
        });
        config.subscribeCallback('min', () => {
            words_counter = 0;
            start = performance.now();
        });

        return elem;
    }
}