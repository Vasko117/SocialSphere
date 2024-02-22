let loggerInstance;

class MainLogger {
    constructor() {
        if (loggerInstance) {
            throw new Error("You can only create one instance of MainLogger.")
        }
        loggerInstance = this;
    }

    log(message) {
        console.log(message);
    }
}

const mainLogger = Object.freeze(new MainLogger());
export default mainLogger;