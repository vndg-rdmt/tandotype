import { TDUndefinedUtils } from "../types"


export const TDEmptyBlockUtility: TDUndefinedUtils = function(settings) {
    return (config) => {
        const elem = new config.elementConstructor<string>({
            name:           '',
            defaultValue:   '',
            elementStyling: settings.elementStyling,
            nameStyling:    settings.nameStyling,
            valueStyling:   settings.valueStyling,
        });
        elem.innerHTML = '';
        return elem;
    }
}