import Requests from "./Reqs";

class Logger {
    static log(lvl, msg){
        
        Requests.post("log",{level: lvl, message: msg});
    }
    static async getLogs(){
        let message = await (await Requests.get("log")).text();

        return message;
    }
}

export default Logger;