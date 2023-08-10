import { TDUtilityComponent } from './application/utility-component';
import { TDKeyboardComponent } from './components/keyboard';
import { TDTypingUtilityConfig, TDTimerUtilityConfig, TDUtility, TDUtilityLoader, TandotypeConfig, empty_eventy, TDUtilityConfig, TDEventSubsribeCallback } from './types';
import { getLangSwitchDispatcher } from './tools';
import { TDEventCatcher, TDTimeEventCatcher, TDTypingEventCatcher } from './event-catchers';

export class TandotypeApp {
    constructor(config: TandotypeConfig) {
        this.root.className        = config.cssClasses.app;
        this.utilsHolder.className = config.cssClasses.utilsHolder;
        this.typingListener = new TDTypingEventCatcher();
        this.timerListener  = new TDTimeEventCatcher();

        this.root.append(
            this.utilsHolder,
            new TDKeyboardComponent({
                localesMapping:         config.keysLocales,
                keyboardStyle:          config.cssClasses.keyboard,
                keybuttonStyle:         config.cssClasses.keybutton,
                keypressedStyle:        config.cssClasses.keypressed,
                listenLanguageChanges:  getLangSwitchDispatcher,
                typingSubsribeCallback: this.typingListener.subsribeEvent,
            }),

        );

        this.loadTypingUtilities = this.
            getUtilityLoader(this.typingListener);

        this.loadTimerUtilities  = this.
            getUtilityLoader(this.timerListener);

    }

    private readonly root:         HTMLElement = document.createElement('div');
    private readonly utilsHolder: HTMLElement  = document.createElement('div');

    private readonly typingListener: TDTypingEventCatcher;
    private readonly timerListener:  TDTimeEventCatcher;

    public readonly loadTypingUtilities: TDUtilityLoader<TDUtility<TDTypingUtilityConfig>>;
    public readonly loadTimerUtilities:  TDUtilityLoader<TDUtility<TDTimerUtilityConfig>>;

    private getUtilityLoader<T extends string, E extends empty_eventy, U extends TDUtility<TDUtilityConfig<TDEventSubsribeCallback<T, E>>>>(subscriber: TDEventCatcher<T, E>):
        TDUtilityLoader<U> {
        return (...utilities: U[]) => {
            this.utilsHolder.append(
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
