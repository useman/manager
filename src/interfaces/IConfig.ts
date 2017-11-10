import {EnvType} from "../enums/EnvType";

export interface IConfig {
    env: EnvType,
    mysql: {
        host: string,
        port: number,
        username: string,
        password: string,
        database: string
    },
    queues: {
        timeouts: {
            SearchSuitableBotQueue: number
        }
    }
}