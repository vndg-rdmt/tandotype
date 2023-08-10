import { TDTimeEventType, TDTypingEventType, empty_eventy } from "./types";

type tempEvHandler<T> = (e: T) => void

export abstract class TDEventCatcher<PossibleEvs extends string, Ev extends empty_eventy> {
    constructor() {
        this.getFuncExecuteCallbacks = this.getFuncExecuteCallbacks.bind(this);
        this.subsribeEvent = this.subsribeEvent.bind(this);

        this.listen  = this.listen.bind(this);
        this.silence = this.silence.bind(this);
    }

    /**
     * Pushed external callbacks to be executed
     * on specified event.
     */
    protected abstract subscribers: Map<PossibleEvs, ((e: Ev) => void)[]>;
    
    /**
     * Starts events dispatching.
     */
    public abstract listen(): void;    
    
    /**
     * Starts events dispatching.
     */
    public abstract silence(): void;

    /**
     * Pushes new callback to be executed on
     * specified event.
     */
    public subsribeEvent(eventype: PossibleEvs, callback: (e: Ev) => void) {
        this.subscribers.get(eventype)?.push(callback);
    }

    /**
     * Creates execution function to reduce amount of code,
     * used only once in constructor.
     */
    protected getFuncExecuteCallbacks(eventType: PossibleEvs): (e: Ev) => void {
        return (e: Ev) => {
            const arr = this.subscribers.get(eventType)!;
            for (let i = 0; i < arr.length; i++) arr[i](e);
        };
    }

    /**
     * Creates subsribers mapping storage for specified generic types
     * of a current event-catcher.
     */
    protected getSubsribersStorage(eventNames: PossibleEvs[]): Map<PossibleEvs, Array<tempEvHandler<Ev>>> {
        const mapping: Map<PossibleEvs, Array<tempEvHandler<Ev>>> = new Map();
        for (let i = 0; i < eventNames.length; i++) mapping.set(eventNames[i], []);
        return mapping;
    }
}



export class TDTypingEventCatcher extends TDEventCatcher<TDTypingEventType, KeyboardEvent> {
    constructor() {
        super();
        this.dispatchDown = this.getFuncExecuteCallbacks('keydown');
        this.dispatchUp   = this.getFuncExecuteCallbacks('keyup');
        this.subscribers  = this.getSubsribersStorage(['keydown', 'keypress', 'keyup']);
    }
    
    protected subscribers;
    private readonly dispatchDown: (e: KeyboardEvent) => void;
    private readonly dispatchUp:   (e: KeyboardEvent) => void;


    public listen(): void {
        window.addEventListener('keydown',  this.dispatchDown);
        window.addEventListener('keyup',    this.dispatchUp);
    }

    public silence(): void {
        window.removeEventListener('keydown',  this.dispatchDown);
        window.removeEventListener('keyup',    this.dispatchUp);
    }
}



export class TDTimeEventCatcher extends TDEventCatcher<TDTimeEventType, {}> {
    constructor() {
        super();
        this.dispatchAnim = this.getFuncExecuteCallbacks('anim');
        this.reqCallback  = this.reqCallback.bind(this);
        this.dispatchMin  = this.getFuncExecuteCallbacks('min');
        this.dispatchSec  = this.getFuncExecuteCallbacks('sec');
        this.subscribers  = this.getSubsribersStorage(['sec', 'min', 'anim']);
    }
    
    protected subscribers;
    private readonly dispatchAnim: (e: {}) => void;
    private readonly dispatchMin:  (e: {}) => void;
    private readonly dispatchSec:  (e: {}) => void;

    protected reqAnimHandle: number|undefined;

    protected reqCallback(): void {
        this.dispatchAnim({});
        this.reqAnimHandle = requestAnimationFrame(this.reqCallback);
    }

    protected secIntervalAnchor: number|undefined;
    protected minIntervalAnchor: number|undefined;

    public listen(): void {
        if (this.reqAnimHandle === undefined) {
            this.reqCallback();
        };        
        if (this.minIntervalAnchor === undefined) {
            this.minIntervalAnchor = setInterval(this.dispatchMin, 60 * 1000);
        };
        if (this.secIntervalAnchor === undefined) {
            this.secIntervalAnchor = setInterval(this.dispatchSec, 1000);
        };
    }
    public silence(): void {
        if (this.reqAnimHandle !== undefined) {
            cancelAnimationFrame(this.reqAnimHandle);
            this.reqAnimHandle = undefined;
        };
        if (this.minIntervalAnchor !== undefined) {
            clearInterval(this.minIntervalAnchor);
        };
        if (this.secIntervalAnchor !== undefined) {
            clearInterval(this.secIntervalAnchor);
        };
    }
}