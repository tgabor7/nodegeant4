class Logger {
    static log(lvl, msg){
        fetch('http://radsim.inf.elte.hu:9000/log', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ level: lvl, message: msg })
        });
    }
    static async getLogs(){
        let req = await fetch('http://radsim.inf.elte.hu:9000/log', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
        })
        let message = await req.text();

        return message;
    }
}

export default Logger;