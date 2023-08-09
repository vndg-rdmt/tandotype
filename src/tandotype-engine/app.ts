import { TDUtilityComponent } from './application/utility-component';
import { TDKeyboardComponent } from './components/keyboard';
import { TDUtility, TandotypeConfig } from './types';
import { getLangSwitchDispatcher } from './utilities/tools';
import { TDTypingEventCatcher } from './utilities/typing';

export class TandotypeApp {
    constructor(config: TandotypeConfig) {
        this.root.className = config.cssClasses.app;
        this.typingListener = new TDTypingEventCatcher();
        
        this.root.appendChild(
            new TDKeyboardComponent({
                localesMapping:         config.keysLocales,
                keyboardStyle:          config.cssClasses.keyboard,
                keybuttonStyle:         config.cssClasses.keybutton,
                keypressedStyle:        config.cssClasses.keypressed,
                listenLanguageChanges:  getLangSwitchDispatcher,
                typingSubsribeCallback: this.typingListener.subsribeEvent,
            })
        );
    }

    private readonly root: HTMLElement = document.createElement('div');
    private readonly typingListener: TDTypingEventCatcher

    public loadUtilities(...utilities: TDUtility[]): void {
        utilities.forEach((util) => {
            util({
                elementConstructor: TDUtilityComponent,
                subscribeCallback:  this.typingListener.subsribeEvent,
            });
            this.appStatistics.loadedUtilities++;
        });
    }

    public appStatistics = {
        loadedUtilities: 0,
    }

    public render(mount: HTMLElement): void {
        mount.appendChild(this.root);

        this.typingListener.listen();
    }
}
