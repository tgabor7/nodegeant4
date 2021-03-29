class MaterialList {
    static sources = ["Ac225",
        "Ac227A",
        "Ac227B",
        "Ac228A",
        "Ac228B",
        "Am241",
        "Am243",
        "Am245",
        "At215",
        "At217A",
        "At217B",
        "At218A",
        "At218B",
        "At219A",
        "At219B",
        "Bi209",
        "Bi210A",
        "Bi210B",
        "Bi211A",
        "Bi211B",
        "Bi212A",
        "Bi212B",
        "Bi213A",
        "Bi213B",
        "Bi214A",
        "Bi214B",
        "Bi215",
        "Bk249A",
        "Bk249B",
        "Cf249",
        "Cf253A",
        "Cf253B",
        "Cm244",
        "Cm245",
        "Cm249",
        "Co60",
        "Es253",
        "Fr221",
        "Fr223A",
        "Fr223B",
        "Fr224",
        "Hg206",
        "Ni60",
        "Np237",
        "Np239",
        "Pa231",
        "Pa233",
        "Pa234",
        "Pa234MB",
        "Pa234MI",
        "Pb206",
        "Pb207",
        "Pb208",
        "Pb209",
        "Pb210A",
        "Pb210B",
        "Pb211",
        "Pb212",
        "Pb214",
        "Po210",
        "Po211",
        "Po212",
        "Po213",
        "Po214",
        "Po215A",
        "Po215B",
        "Po216",
        "Po218A",
        "Po218B",
        "Pu236",
        "Pu238",
        "Pu239",
        "Pu240",
        "Pu241A",
        "Pu241B",
        "Pu242",
        "Ra223",
        "Ra224",
        "Ra225",
        "Ra226",
        "Ra228",
        "Rn217",
        "Rn218",
        "Rn219",
        "Rn220",
        "Rn222",
        "Th227",
        "Th228",
        "Th229",
        "Th230",
        "Th231",
        "Th232",
        "Th234",
        "Tl206",
        "Tl207",
        "Tl208",
        "Tl209",
        "Tl210",
        "U232",
        "U233",
        "U234",
        "U235",
        "U236",
        "U237",
        "U238"
    ];
    static compounds = [
        "A-150_TISSUE",
        "ACETONE",
        "ACETYLENE",
        "ADENINE",
        "ADIPOSE_TISSUE_ICRP",
        "AIR",
        "ALANINE",
        "ALUMINUM_OXIDE",
        "AMBER",
        "AMMONIA",
        "ANILINE",
        "ANTHRACENE",
        "B-100_BONE",
        "BAKELITE",
        "BARIUM_FLUORIDE",
        "BARIUM_SULFATE",
        "BENZENE",
        "BERYLLIUM_OXIDE",
        "BGO",
        "BLOOD_ICRP",
        "BONE_COMPACT_ICRU",
        "BONE_CORTICAL_ICRP",
        "BORON_CARBIDE",
        "BORON_OXIDE",
        "BRAIN_ICRP",
        "BUTANE",
        "N-BUTYL_ALCOHOL",
        "C-552",
        "CADMIUM_TELLURIDE",
        "CADMIUM_TUNGSTATE",
        "CALCIUM_CARBONATE",
        "CALCIUM_FLUORIDE",
        "CALCIUM_OXIDE",
        "CALCIUM_SULFATE",
        "CALCIUM_TUNGSTATE",
        "CARBON_DIOXIDE",
        "CARBON_TETRACHLORIDE",
        "CELLULOSE_CELLOPHANE",
        "CELLULOSE_BUTYRATE",
        "CELLULOSE_NITRATE",
        "CERIC_SULFATE",
        "CESIUM_FLUORIDE",
        "CESIUM_IODIDE",
        "CHLOROBENZENE",
        "CHLOROFORM",
        "CONCRETE",
        "CYCLOHEXANE",
        "1,2-DICHLOROBENZENE",
        "DICHLORODIETHYL_ETHER",
        "1,2-DICHLOROETHANE",
        "DIETHYL_ETHER",
        "N,N-DIMETHYL_FORMAMIDE",
        "DIMETHYL_SULFOXIDE",
        "ETHANE",
        "ETHYL_ALCOHOL",
        "ETHYL_CELLULOSE",
        "ETHYLENE",
        "EYE_LENS_ICRP",
        "FERRIC_OXIDE",
        "FERROBORIDE",
        "FERROUS_OXIDE",
        "FERROUS_SULFATE",
        "FREON-12",
        "FREON-12B2",
        "FREON-13",
        "FREON-13B1",
        "FREON-13I1",
        "GADOLINIUM_OXYSULFIDE",
        "GALLIUM_ARSENIDE",
        "GEL_PHOTO_EMULSION",
        "Pyrex_Glass",
        "GLASS_LEAD",
        "GLASS_PLATE",
        "GLUTAMINE",
        "GLYCEROL",
        "GUANINE",
        "GYPSUM",
        "N-HEPTANE",
        "N-HEXANE",
        "KAPTON",
        "LANTHANUM_OXYBROMIDE",
        "LANTHANUM_OXYSULFIDE",
        "LEAD_OXIDE",
        "LITHIUM_AMIDE",
        "LITHIUM_CARBONATE",
        "LITHIUM_FLUORIDE",
        "LITHIUM_HYDRIDE",
        "LITHIUM_IODIDE",
        "LITHIUM_OXIDE",
        "LITHIUM_TETRABORATE",
        "LUNG_ICRP",
        "M3_WAX",
        "MAGNESIUM_CARBONATE",
        "MAGNESIUM_FLUORIDE",
        "MAGNESIUM_OXIDE",
        "MAGNESIUM_TETRABORATE",
        "MERCURIC_IODIDE",
        "METHANE",
        "METHANOL",
        "MIX_D_WAX",
        "MS20_TISSUE",
        "MUSCLE_SKELETAL_ICRP",
        "MUSCLE_STRIATED_ICRU",
        "MUSCLE_WITH_SUCROSE",
        "MUSCLE_WITHOUT_SUCROSE",
        "NAPHTHALENE",
        "NITROBENZENE",
        "NITROUS_OXIDE",
        "NYLON-8062",
        "NYLON-6-6",
        "NYLON-6-10",
        "NYLON-11_RILSAN",
        "OCTANE",
        "PARAFFIN",
        "N-PENTANE",
        "PHOTO_EMULSION",
        "PLASTIC_SC_VINYLTOLUENE",
        "PLUTONIUM_DIOXIDE",
        "POLYACRYLONITRILE",
        "POLYCARBONATE",
        "POLYCHLOROSTYRENE",
        "POLYETHYLENE",
        "MYLAR",
        "PLEXIGLASS",
        "POLYOXYMETHYLENE",
        "POLYPROPYLENE",
        "POLYSTYRENE",
        "TEFLON",
        "POLYTRIFLUOROCHLOROETHYLENE",
        "POLYVINYL_ACETATE",
        "POLYVINYL_ALCOHOL",
        "POLYVINYL_BUTYRAL",
        "POLYVINYL_CHLORIDE",
        "POLYVINYLIDENE_CHLORIDE",
        "POLYVINYLIDENE_FLUORIDE",
        "POLYVINYL_PYRROLIDONE",
        "POTASSIUM_IODIDE",
        "POTASSIUM_OXIDE",
        "PROPANE",
        "lPROPANE",
        "N-PROPYL_ALCOHOL",
        "PYRIDINE",
        "RUBBER_BUTYL",
        "RUBBER_NATURAL",
        "RUBBER_NEOPRENE",
        "SILICON_DIOXIDE",
        "SILVER_BROMIDE",
        "SILVER_CHLORIDE",
        "SILVER_HALIDES",
        "SILVER_IODIDE",
        "SKIN_ICRP",
        "SODIUM_CARBONATE",
        "SODIUM_IODIDE",
        "SODIUM_MONOXIDE",
        "SODIUM_NITRATE",
        "STILBENE",
        "SUCROSE",
        "TERPHENYL",
        "TESTIS_ICRP",
        "TETRACHLOROETHYLENE",
        "THALLIUM_CHLORIDE",
        "TISSUE_SOFT_ICRP",
        "TISSUE_SOFT_ICRU-4",
        "TISSUE-METHANE",
        "TISSUE-PROPANE",
        "TITANIUM_DIOXIDE",
        "TOLUENE",
        "TRICHLOROETHYLENE",
        "TRIETHYL_PHOSPHATE",
        "TUNGSTEN_HEXAFLUORIDE",
        "URANIUM_DICARBIDE",
        "URANIUM_MONOCARBIDE",
        "URANIUM_OXIDE",
        "UREA",
        "VALINE",
        "VITON",
        "WATER",
        "WATER_VAPOR",
        "XYLENE",
        "GRAPHITE"
    ];
    static materials = [{ symbol: "H", z: 1, name: "Hydrogen" },
    { symbol: "He", z: 2, name: "Helium" },
    { symbol: "Li", z: 3, name: "Lithium" },
    { symbol: "Be", z: 4, name: "Beryllium" },
    { symbol: "B", z: 5, name: "Boron" },
    { symbol: "C", z: 6, name: "Carbon" },
    { symbol: "N", z: 7, name: "Nitrogen" },
    { symbol: "O", z: 8, name: "Oxygen" },
    { symbol: "F", z: 9, name: "Fluorine" },
    { symbol: "Ne", z: 10, name: "Neon" },
    { symbol: "Na", z: 11, name: "Sodium" },
    { symbol: "Mg", z: 12, name: "Magnesium" },
    { symbol: "Al", z: 13, name: "Aluminium" },
    { symbol: "Si", z: 14, name: "Silicon" },
    { symbol: "P", z: 15, name: "Phosphorus" },
    { symbol: "S", z: 16, name: "Sulfur" },
    { symbol: "Cl", z: 17, name: "Chlorine" },
    { symbol: "Ar", z: 18, name: "Argon" },
    { symbol: "K", z: 19, name: "Potassium" },
    { symbol: "Ca", z: 20, name: "Calcium" },
    { symbol: "Sc", z: 21, name: "Scandium" },
    { symbol: "Ti", z: 22, name: "Titanium" },
    { symbol: "V", z: 23, name: "Vanadium" },
    { symbol: "Cr", z: 24, name: "Chromium" },
    { symbol: "Mn", z: 25, name: "Manganese" },
    { symbol: "Fe", z: 26, name: "Iron" },
    { symbol: "Co", z: 27, name: "Cobalt" },
    { symbol: "Ni", z: 28, name: "Nickel" },
    { symbol: "Cu", z: 29, name: "Copper" },
    { symbol: "Zn", z: 30, name: "Zinc" },
    { symbol: "Ga", z: 31, name: "Gallium" },
    { symbol: "Ge", z: 32, name: "Germanium" },
    { symbol: "As", z: 33, name: "Arsenic" },
    { symbol: "Se", z: 34, name: "Selenium" },
    { symbol: "Br", z: 35, name: "Bromine" },
    { symbol: "Kr", z: 36, name: "Krypton" },
    { symbol: "Rb", z: 37, name: "Rubidium" },
    { symbol: "Sr", z: 38, name: "Strontium" },
    { symbol: "Y", z: 39, name: "Yttrium" },
    { symbol: "Zr", z: 40, name: "Zirconium" },
    { symbol: "Nb", z: 41, name: "Niobium" },
    { symbol: "Mo", z: 42, name: "Molybdenum" },
    { symbol: "Tc", z: 43, name: "Technetium" },
    { symbol: "Ru", z: 44, name: "Ruthenium" },
    { symbol: "Rh", z: 45, name: "Rhodium" },
    { symbol: "Pd", z: 46, name: "Palladium" },
    { symbol: "Ag", z: 47, name: "Silver" },
    { symbol: "Cd", z: 48, name: "Cadmium" },
    { symbol: "In", z: 49, name: "Indium" },
    { symbol: "Sn", z: 50, name: "" },
    { symbol: "Sb", z: 51, name: "Antimony" },
    { symbol: "Te", z: 52, name: "Tellurium" },
    { symbol: "I", z: 53, name: "Iodine" },
    { symbol: "Xe", z: 54, name: "Xenon" },
    { symbol: "Cs", z: 55, name: "Caesium" },
    { symbol: "Ba", z: 56, name: "Barium" },
    { symbol: "La", z: 57, name: "Lanthanum" },
    { symbol: "Ce", z: 58, name: "Cerium" },
    { symbol: "Pr", z: 59, name: "Praseodymium" },
    { symbol: "Nd", z: 60, name: "Neodymium" },
    { symbol: "Pm", z: 61, name: "Promethium" },
    { symbol: "Sm", z: 62, name: "Samarium" },
    { symbol: "Eu", z: 63, name: "Europium" },
    { symbol: "Gd", z: 64, name: "Gadolinium" },
    { symbol: "Tb", z: 65, name: "Terbium" },
    { symbol: "Dy", z: 66, name: "Dysprosium" },
    { symbol: "Ho", z: 67, name: "Holmium" },
    { symbol: "Er", z: 68, name: "Erbium" },
    { symbol: "Tm", z: 69, name: "Thulium" },
    { symbol: "Yb", z: 70, name: "Ytterbium" },
    { symbol: "Lu", z: 71, name: "Lutetium" },
    { symbol: "Hf", z: 72, name: "Hafnium" },
    { symbol: "Ta", z: 73, name: "Tantalum" },
    { symbol: "W", z: 74, name: "Tungsten" },
    { symbol: "Re", z: 75, name: "Rhenium" },
    { symbol: "Os", z: 76, name: "Osmium" },
    { symbol: "Ir", z: 77, name: "Iridium" },
    { symbol: "Pt", z: 78, name: "Platinum" },
    { symbol: "Au", z: 79, name: "Gold" },
    { symbol: "Hg", z: 80, name: "Mercury" },
    { symbol: "Tl", z: 81, name: "Thallium" },
    { symbol: "Pb", z: 82, name: "Lead" },
    { symbol: "Bi", z: 83, name: "Bismuth" },
    { symbol: "Po", z: 84, name: "Polonium" },
    { symbol: "At", z: 85, name: "Astatine" },
    { symbol: "Rn", z: 86, name: "Radon" },
    { symbol: "Fr", z: 87, name: "Francium" },
    { symbol: "Ra", z: 88, name: "Radium" },
    { symbol: "Ac", z: 89, name: "Actinium" },
    { symbol: "Th", z: 90, name: "Thorium" },
    { symbol: "Pa", z: 91, name: "Protactinium" },
    { symbol: "U", z: 92, name: "Uranium" },
    { symbol: "Np", z: 93, name: "Neptunium" },
    { symbol: "Pu", z: 94, name: "Plutonium" },
    { symbol: "Am", z: 95, name: "Americium" },
    { symbol: "Cm", z: 96, name: "Curium" },
    { symbol: "Bk", z: 97, name: "Berkelium" },
    { symbol: "Cf", z: 98, name: "Californium" }];
    static get(name) {
        for (let i = 0; i < MaterialList.materials.length; i++) {
            if (name == MaterialList.materials[i].symbol) return MaterialList.materials[i];
        }
        return name;
    }
    static check(s) {
        for (let i = 0; i < MaterialList.materials.length; i++) {
            if (s == MaterialList.materials[i]) return true;
        }
        return false;
    }

    static checkMaterial(mat, f) {
        for (let i = 0; i < MaterialList.materials.length; i++) {
            if (mat == MaterialList.materials[i].symbol){
                return true;
            }
        }
        for(let i = 0;i<MaterialList.compounds.length;i++){
            if(mat == MaterialList.compounds[i]){
                return true;
            }
        }
        f();
        return false;
    }
    static checkSource(source, f){
        for(let i = 0;i<MaterialList.sources.length;i++){
            if(source == MaterialList.sources[i]){
                return true;
            }
        }
        f();
        return false;
    }
}
module.exports = MaterialList;