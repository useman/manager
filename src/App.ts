import QueueManager from "./queues/QueueManager";
import {getFromContainer} from "./container";
import {createConnection} from "typeorm";
import {IConfig} from "./interfaces/IConfig";
import {EnvType} from "./enums/EnvType";

let config: IConfig = require('../config.json');

export default class App {

    public async start(): Promise<void> {

        let dir = (config.env == EnvType.local) ? "src":"build";
        let file_type = (config.env == EnvType.local) ? "ts":"js";

        await createConnection({
            "type": "mysql",
            "host": config.mysql.host,
            "port": config.mysql.port,
            "username": config.mysql.username,
            "password": config.mysql.password,
            "database": config.mysql.database,
            "synchronize": false,
            "entities": [
                dir + "/entity/**/*." + file_type
            ],
            "migrations": [
                dir + "/migration/**/*." + file_type
            ],
            "subscribers": [
                dir + "/subscriber/**/*." + file_type
            ],
            "cli": {
                "entitiesDir": dir + "/entity",
                "migrationsDir": dir + "/migration",
                "subscribersDir": dir + "/subscriber"
            }
        });

        await this.getQueueManager().startAll();
    }

    public getQueueManager(): QueueManager {
        return getFromContainer(QueueManager)
    }
}