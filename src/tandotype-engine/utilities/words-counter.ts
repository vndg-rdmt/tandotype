import { TDUtilityConfig } from "../types";

export function TDWordsCounterUtility(config: TDUtilityConfig) {
    let lastChar: string = '';
    config.subscribeCallback('keypress', (e) => {
        console.log(e.code)
    });
}