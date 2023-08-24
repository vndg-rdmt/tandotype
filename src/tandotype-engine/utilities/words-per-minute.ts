import { TDTimerUtilityConfig, TDUtils } from "../types";


export const TDWPMUtility: TDUtils<TDTimerUtilityConfig> = function(settings) {
    return (config) => {
        let charsTyped: number = 0

        const elem = new config.elementConstructor<number>({
            name:           'WPM',
            defaultValue:   charsTyped,
            elementStyling: settings.elementStyling,
            nameStyling:    settings.nameStyling,
            valueStyling:   settings.valueStyling,
        });

        let start: number = performance.now();
        let words_counter: number = 0;
        let prev_is_char: boolean = false;
        window.addEventListener('keypress', (e) => {
            if (!e.repeat) {
                words_counter += +(prev_is_char && (e.code === "Space" || e.code === "Enter"));
                prev_is_char = e.code.startsWith('Key') || e.code.startsWith('Digit');
            };
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