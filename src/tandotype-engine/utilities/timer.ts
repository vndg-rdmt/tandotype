import { TDTimerUtilityConfig, TDUtils } from "../types";


export const TDTimeDateUtility: TDUtils<TDTimerUtilityConfig> = function(settings) {
    return (config) => {        
        const elem = new config.elementConstructor<string>({
            name:           'timer',
            defaultValue:   new Date().toTimeString().split(' ')[0],
            elementStyling: settings.elementStyling,
            nameStyling:    settings.nameStyling,
            valueStyling:   settings.valueStyling,
        });

        config.subscribeCallback('sec', () => {
            elem.updateValue(new Date().toTimeString().split(' ')[0]);
        });

        return elem;
    }
}