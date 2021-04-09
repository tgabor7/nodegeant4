import Requests from "./Reqs";


/*
Logging class
*/
class Logger {
    //Create a log
    static log(lvl, msg){
        Requests.post("log",{level: lvl, message: msg});
    }
    //get all logs
    static async getLogs(){
        let message = await (await Requests.get("log")).text();

        return message;
    }
}

export default Logger;