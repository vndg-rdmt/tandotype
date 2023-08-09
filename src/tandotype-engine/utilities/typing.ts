import { TypingEventType } from "../types";


export class TDTypingEventCatcher {
    constructor() {
        this.dispatchDown  = this.getFuncExecuteCallbacks('keydown').bind(this);
        this.dispatchUp    = this.getFuncExecuteCallbacks('keyup').bind(this);
        this.subsribeEvent = this.subsribeEvent.bind(this);
    }

    private readonly dispatchDown: (e: KeyboardEvent) => void;
    private readonly dispatchUp:   (e: KeyboardEvent) => void;

    /**
     * Pushed external callbacks to be executed
     * on specified event.
     */
    private subscribers: Map<TypingEventType, ((e: KeyboardEvent) => void)[]> = new Map([
        ['keyup',   []],
        ['keydown', []],
    ]);

    /**
     * Creates execution function to reduce amount of code,
     * used only once in constructor.
     */
    private getFuncExecuteCallbacks(eventType: TypingEventType): (e: KeyboardEvent) => void {
        return (e: KeyboardEvent) => {
            const arr = this.subscribers.get(eventType)!;
            for (let i = 0; i < arr.length; i++) arr[i](e);
        };
    }

    /**
     * Dispatches events on typing.
     */
    public listen(): void {
        window.addEventListener('keydown',  this.dispatchDown);
        window.addEventListener('keyup',    this.dispatchUp);
    }

    /**
     * Stops events dispatching on typing.
     */
    public silence(): void {
        window.removeEventListener('keydown',  this.dispatchDown);
        window.removeEventListener('keyup',    this.dispatchUp);
    }

    /**
     * Pushes new callback to be executed on
     * specified event.
     */
    public subsribeEvent(eventype: TypingEventType, callback: (e: KeyboardEvent) => void) {
        this.subscribers.get(eventype)?.push(callback);
    }
}