import { TDTypingUtilityConfig, TDUtils } from "../types";


export const TDTypingCatcherUtility: TDUtils<TDTypingUtilityConfig> = function(settings) {
    return (config) => {

        const elem = new config.elementConstructor<''>({
            name:           'Count',
            defaultValue:   '',
            elementStyling: settings.elementStyling,
            nameStyling:    settings.nameStyling,
            valueStyling:   settings.valueStyling,
        });

        const e =  document.createElement('div')
        e.style.width = '100px'
        e.style.height = '100px'
        e.style.backgroundColor = 'red'
        config.subscribeCallback('keydown', () => {
            elem.append(e)
        });

        return elem;
    }
}