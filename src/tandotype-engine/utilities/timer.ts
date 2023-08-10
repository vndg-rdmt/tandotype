import { TDTimerUtilityConfig, TDUtils } from "../types";


export const TDTimeDateUtility: TDUtils<TDTimerUtilityConfig> = function(settings) {
    return (config) => {        
        const elem = new config.elementConstructor<Date>({
            name:           'timer',
            defaultValue:   new Date(),
            elementStyling: settings.elementStyling,
            nameStyling:    settings.nameStyling,
            valueStyling:   settings.valueStyling,
        });

        config.subscribeCallback('sec', () => {
            elem.updateValue(new Date());
        });

        return elem;
    }
}