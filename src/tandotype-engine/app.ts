import { TDUtilityComponent } from './application/utility-component';
import { TDKeyboardComponent } from './components/keyboard';
import { TDEventSubsribeCallback, TDTypingUtilityConfig, TDTimerUtilityConfig, TDUtility, TDUtilityConfig, TDUtilityLoader, TandotypeConfig } from './types';
import { getLangSwitchDispatcher } from './utilities/tools';
import { TDEventCatcher, TDTimeEventCatcher, TDTypingEventCatcher } from './event-catchers';

export class TandotypeApp {
    constructor(config: TandotypeConfig) {
        this.root.className = config.cssClasses.app;
        this.typingListener = new TDTypingEventCatcher();
        this.timerListener  = new TDTimeEventCatcher();

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

        this.loadTypingUtilities = this.
            getUtilityLoader(this.typingListener);

        this.loadTimerUtilities  = this.
            getUtilityLoader(this.timerListener);

    }

    private readonly root: HTMLElement = document.createElement('div');
    private readonly typingListener: TDTypingEventCatcher;
    private readonly timerListener: TDTimeEventCatcher;

    public readonly loadTypingUtilities: TDUtilityLoader<TDUtility<TDTypingUtilityConfig>>;
    public readonly loadTimerUtilities:  TDUtilityLoader<TDUtility<TDTimerUtilityConfig>>;

    // WARN: type-unsafe
    private getUtilityLoader<UTILS extends TDUtility<any>>(subscriber: TDEventCatcher<string, any>): TDUtilityLoader<UTILS> {
        return (...utilities: UTILS[]) => {
            this.root.append(
                ...utilities.map((util) => util({
                    elementConstructor: TDUtilityComponent,
                    subscribeCallback:  subscriber.subsribeEvent,
                }))
            );
            this.appStatistics.loadedUtilities += utilities.length;
        };
    }

    public appStatistics = {
        loadedUtilities: 0,
    }

    public render(mount: HTMLElement): void {
        mount.appendChild(this.root);

        this.typingListener.listen();
        this.timerListener.listen();
    }
}
