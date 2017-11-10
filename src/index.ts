import "reflect-metadata";
import App from "./App";
import {Notification} from "./entity/Notification";

(async () => {

    const app: App = new App();

    await app.start();

    console.log("App started");

})();