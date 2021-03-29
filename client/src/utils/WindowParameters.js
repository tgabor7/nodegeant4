class WindowParams {
    constructor(){}
    static get(parameter){
        const windowUrl = window.location.search;
        const params = new URLSearchParams(windowUrl);
        const param = params.get(parameter);

        return param;
    }
}

export default WindowParams;