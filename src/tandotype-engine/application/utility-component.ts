import { TDUtilityElementConfig } from "../types";


export class TDUtilityComponent<T extends any> extends HTMLElement {
    public constructor(config: TDUtilityElementConfig<T>) {
        super();
        this.className = config.elementStyling;

        this.nameElement = document.createElement('div');
        this.nameElement.textContent = config.name;
        this.nameElement.className   = config.nameStyling;
        
        this.valueElement = document.createElement('div');
        this.realValue    = config.defaultValue;
        this.valueElement.textContent = `${config.defaultValue}`;
        this.valueElement.className   = config.valueStyling;

        this.append(this.nameElement, this.valueElement);

    }

    private readonly nameElement: HTMLElement;
    private readonly valueElement: HTMLElement;

    private realValue: T;
    public updateValue(value: T): void {
        this.realValue = value;
        this.valueElement.textContent = `${value}`;
    }

    public getValue(): T {
        return this.realValue;
    }
}
customElements.define('td-utility-component', TDUtilityComponent);