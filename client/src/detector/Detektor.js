class Detector {
    constructor(m) {
        this.model = m;
        this.material = '';
        this.active = false;
        this.deposit = 0;
        this.name = "";
        this.id = 0;
        this.hits = [];
        this.numberOfHits = [];
    }
    contains(f) {
        for (var i = 0; i < this.hits.length; i++) {
            if (f == this.hits[i]) return true;
        }
        return false;
    }
    clearDeposit(){
        this.hits = [];
        this.numberOfHits = [];
    }
    sort() {
        var list = [];
        for (var j = 0; j < this.hits.length; j++)
            list.push({ 'hit': this.hits[j], 'no': this.numberOfHits[j] });

        list.sort(function (a, b) {
            return ((a.hit < b.hit) ? -1 : ((a.hit == b.hit) ? 0 : 1));
        });
        
        for (var k = 0; k < list.length; k++) {
            this.hits[k] = list[k].hit;
            this.numberOfHits[k] = list[k].no;
        }
    }
    getIndex(f) {
        for (var i = 0; i < this.hits.length; i++) {
            if (Math.abs(f-this.hits[i]) == 0) return i;
        }
        return -1;
    }
};

export default Detector;