class Requests{
    constructor(){}
    static url = "http://localhost:9000/"
    static get = async (route) => {
        let response = await fetch(this.url + route, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: 'GET'
        });
        //let json = await response.json();

        return response;
    }

    static post = async (route, parameters) => {
        let response = await fetch(this.url + route, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(parameters)
        });
        //let json = await response.json();

        return response;
    }
}

export default Requests;