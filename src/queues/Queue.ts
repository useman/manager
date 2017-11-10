import {QueueState} from "../enums/QueueState";

export default abstract class Queue {

    private _timeout: number;

    private _state: QueueState = QueueState.STOPPED;

    private actionStop: boolean = false;

    constructor(timeout?: number) {
        this._timeout = timeout || 5000;
    }

    protected abstract async work(step?: Function): Promise<void>;

    public async start(timeout?: number): Promise<void> {

        if (this.actionStop) {
            setTimeout(async () => {
                await this.start(timeout);
            }, 1000);
            return;
        }

        this._state = QueueState.IN_PROGRESS;

        timeout = timeout || this._timeout;

        await this.work(() => {
            if (this.actionStop) {
                this.actionStop = false;
                return;
            }

            setTimeout(async () => {
                await this.start(timeout);
            }, timeout)
        });
    }

    public async stop(): Promise<void>{
        this.actionStop = true;
        this._state = QueueState.STOPPED;
    }
    get timeout(): number {
        return this._timeout;
    }

    get state(): QueueState {
        return this._state;
    }

}