
/**
 * Starts listening for user language changes.
 * Executes provided callback on event.
 */
export function getLangSwitchDispatcher(callback: (lang: string) => void) {
    let currentLang: string = '';
    
    function verify(): void {
        if (currentLang != navigator.languages[0]) {
            currentLang = navigator.languages[0];
            callback(currentLang);
        };
        requestAnimationFrame(verify);
    };

    return verify();
}