import {QueueState} from "../enums/QueueState";

export interface IQueue {

    timeout: number,

    state: QueueState,

    start(): Promise<void>
    stop(): Promise<void>

}