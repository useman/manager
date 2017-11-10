import {IQueue} from "../interfaces/IQueue";
import {QueueState} from "../enums/QueueState";
import {SearchSuitableBotQueue} from "./SearchSuitableBotQueue";
import {IConfig} from "../interfaces/IConfig";

let config: IConfig = require('../../config.json');

export default class QueueManager {

    private _queues: Array<IQueue> = [];

    constructor() {
        this.pushQueue(new SearchSuitableBotQueue(config.queues.timeouts.SearchSuitableBotQueue));
    }

    public pushQueue<T extends IQueue>(queue: T): void {
        this._queues.push(queue);
    }

    public async startAll(): Promise<void> {
        for (let queue of this.queues) {
            if (queue.state === QueueState.STOPPED) {
                await queue.start();
            }
        }
    }

    public async stopAll(): Promise<void> {
        for (let queue of this.queues) {
            if (queue.state === QueueState.IN_PROGRESS) {
                await queue.stop();
            }
        }
    }

    get queues(): Array<IQueue> {
        return this._queues;
    }
}