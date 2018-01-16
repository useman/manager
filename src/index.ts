import "reflect-metadata";
import App from "./App";
import {Notification} from "./entity/Notification";

let pmx: any = require('pmx');

(async () => {

    const app: App = new App();

    await app.start();

    console.log("App started");

    pmx.init({
        http          : true, // HTTP routes logging (default: true)
        errors        : true, // Exceptions logging (default: true)
        custom_probes : true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
        network       : true, // Network monitoring at the application level
        ports         : true  // Shows which ports your app is listening on (default: false)
    });

    process.on('unhandledRejection', function(err, promise) {
        console.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
        pmx.notify(err);
        setTimeout(() => {
            console.log('Exit');
            process.exit(1);
        }, 3000);
    });

})();