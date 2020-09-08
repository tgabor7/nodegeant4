class UnitConverter {
    static convertLength(v){
        switch(v){
            case(".1"):
                return "mm";
            case("1"):
                return "cm";
            case("10"):
                return "dm";
            case("100"):
                return "m";
            default:
                return "cm";
        }
    }
    static convertAngle(v){
        if(v==1) return "rad";
        else return "deg";
    }
    static convertEnergy(v){
        switch(v){
            case("1"):
                return "eV";
            case("1000"):
                return "keV";
            case("1000000"):
                return "MeV";
            case("1000000000"):
                return "GeV";
            default:
                return "keV";
        }
    }
}

export default UnitConverter;