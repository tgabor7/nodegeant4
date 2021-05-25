/*
Class reprezenting a detector 
*/

class Detector {
    constructor(m) {
        this.model = m;
        this.material = 'Pb';
        this.active = false;
        this.deposit = 0;
        this.name = "";
        this.id = 0;
        this.hits = [];
        this.geometry = 'cube';
        this.numberOfHits = [];
        this.units = [1,1,1];
    }
};

export default Detector;