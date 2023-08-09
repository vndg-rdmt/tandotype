
export interface TDUtilityElementConfig {
    name:           string;
    defaultValue:   string;
    elementStyling: string;
    nameStyling:    string;
    valueStyling:   string;
}

export class TDUtilityComponent extends HTMLElement {
    public constructor(config: TDUtilityElementConfig) {
        super();
        this.className = config.elementStyling;

        this.nameElement  = document.createElement('div');
        this.nameElement.textContent = config.defaultValue;
        this.nameElement.className   = config.nameStyling;

        this.valueElement = document.createElement('div');
        this.valueElement.textContent = config.name;
        this.valueElement.className   = config.valueStyling;

    }

    private readonly nameElement: HTMLElement;
    private readonly valueElement: HTMLElement;

    public updateValue(value: string): void {
        this.valueElement.textContent = value;
    }
}