import { TDTypingUtilityConfig, TDUtils } from "../types";


export const TDCharsTypingSpeedUtility: TDUtils<TDTypingUtilityConfig> = function(settings) {
    return (config) => {
        let charsPerSecond: number = 0;
        const elem = new config.elementConstructor<number>({
            name:           'Characters speed',
            defaultValue:   charsPerSecond,
            elementStyling: settings.elementStyling,
            nameStyling:    settings.nameStyling,
            valueStyling:   settings.valueStyling,
        });

        setInterval(() => {
            elem.updateValue(charsPerSecond);
            charsPerSecond = 0;
        }, 1000)
    
        config.subscribeCallback('keydown', () => {
            charsPerSecond++;
        });

        return elem;
    }
}