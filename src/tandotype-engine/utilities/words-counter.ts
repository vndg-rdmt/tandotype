import { TDTypingUtilityConfig, TDUtility } from "../types";

export const TDWordsCounterUtility: TDUtility<TDTypingUtilityConfig> = function(config) {
    let lastChar: string = '';
    config.subscribeCallback('keypress', (e) => {
        console.log(e.code)
    });
}