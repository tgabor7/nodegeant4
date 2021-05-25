import Unitconverter from "./UnitConverter";

test("Convert length test",()=>{
    expect(Unitconverter.convertLength("100")).toBe("m");
    expect(Unitconverter.convertLength("")).toBe("cm");
    expect(Unitconverter.convertLength("10")).toBe("dm");
    expect(Unitconverter.convertLength("1")).toBe("cm");
    expect(Unitconverter.convertLength(".1")).toBe("mm");
});
test("Convert energy test", ()=>{
    expect(Unitconverter.convertEnergy("")).toBe("keV");
    expect(Unitconverter.convertEnergy("1")).toBe("eV");
    expect(Unitconverter.convertEnergy("1000")).toBe("keV");
    expect(Unitconverter.convertEnergy("1000000")).toBe("MeV");
    expect(Unitconverter.convertEnergy("1000000000")).toBe("GeV");
});
test("Convert angle test", ()=>{
    expect(Unitconverter.convertAngle(1)).toBe("rad");
    expect(Unitconverter.convertAngle(2)).toBe("deg");
});