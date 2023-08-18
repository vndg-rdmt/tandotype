import { TDUtilityComponent } from './application/utility-component';
import { TDKeyboardComponent } from './components/keyboard';
import { TDTypingUtilityConfig, TDTimerUtilityConfig, TDUtility, TDUtilityLoader, TandotypeConfig, empty_eventy, TDUtilityConfig, TDEventSubsribeCallback, TDUndefinedUtility } from './types';
import { getLangSwitchDispatcher } from './tools';
import { TDEventCatcher, TDTimeEventCatcher, TDTypingEventCatcher } from './event-catchers';
import { TDEmptyBlockUtility } from './utilities/empty-block';
import { TDInputComponent } from './components/input';
import { TDLogotypeElement } from './components/logotype';

export class TandotypeApp {
    constructor(config: TandotypeConfig) {
        this.root.className        = config.cssClasses.app;
        this.utilsHolder.className = config.cssClasses.utilsHolder;
        this.typingListener = new TDTypingEventCatcher();
        this.timerListener  = new TDTimeEventCatcher();

        this.root.append(
            this.utilsHolder,
            new TDInputComponent({
                inputAreaStyle:         config.cssClasses.testArea,
                typingSubsribeCallback: this.typingListener.subsribeEvent,
            }),
            new TDKeyboardComponent({
                localesMapping:         config.keysLocales,
                keyboardStyle:          config.cssClasses.keyboard,
                keybuttonStyle:         config.cssClasses.keybutton,
                keypressedStyle:        config.cssClasses.keypressed,
                listenLanguageChanges:  getLangSwitchDispatcher,
                typingSubsribeCallback: this.typingListener.subsribeEvent,
            }),
            new TDLogotypeElement("TandoType"),
        );

        this.loadTypingUtilities = this.
            getUtilityLoader(this.typingListener);

        this.loadTimerUtilities  = this.
            getUtilityLoader(this.timerListener);
    }

    private readonly root:        HTMLElement = document.createElement('div');
    private readonly utilsHolder: HTMLElement  = document.createElement('div');

    private readonly typingListener: TDTypingEventCatcher;
    private readonly timerListener:  TDTimeEventCatcher;

    public readonly loadTypingUtilities:   TDUtilityLoader<TDUtility<TDTypingUtilityConfig>>;
    public readonly loadTimerUtilities:    TDUtilityLoader<TDUtility<TDTimerUtilityConfig>>;
    
    public loadUndefinedUtilites(...undefinedUtils: TDUndefinedUtility[]): TDUtilityComponent<any>[] {
        this.appStatistics.loadedUtilities += undefinedUtils.length;
        return undefinedUtils.map(util => util({
            elementConstructor: TDUtilityComponent,
        }));
    }

    public wrapUtils(wrapperStyle: string, ...utils: TDUtilityComponent<any>[]): TDUtilityComponent<any> {
        const wrapper = TDEmptyBlockUtility({elementStyling: wrapperStyle, nameStyling: '', valueStyling: ''})({
            elementConstructor: TDUtilityComponent,
        });
        wrapper.append(...utils);
        return wrapper;
    };

    private getUtilityLoader<T extends string, E extends empty_eventy, U extends TDUtility<TDUtilityConfig<TDEventSubsribeCallback<T, E>>>>(subscriber: TDEventCatcher<T, E>):
        TDUtilityLoader<U> {
        return (...utilities: U[]) => {
            this.appStatistics.loadedUtilities += utilities.length;
            return utilities.map((util) => util({
                    elementConstructor: TDUtilityComponent,
                    subscribeCallback:  subscriber.subsribeEvent,
            }));
        };
    }

    public appStatistics = {
        loadedUtilities: 0,
    }

    public renderUtils(...utils: TDUtilityComponent<any>[]): void {
        this.utilsHolder.append(...utils);
    }

    public launch(mount: HTMLElement): void {
        mount.appendChild(this.root);

        this.typingListener.listen();
        this.timerListener.listen();
    }
}
