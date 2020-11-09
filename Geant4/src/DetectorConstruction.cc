#include "DetectorConstruction.hh"
#include "SensitiveDetector.hh"

#include "G4Material.hh"
#include "G4NistManager.hh"
#include "G4SDManager.hh"

#include "G4Box.hh"
#include "G4Tubs.hh"
#include "G4LogicalVolume.hh"
#include "G4PVPlacement.hh"
#include "G4PVParameterised.hh"
#include "G4GlobalMagFieldMessenger.hh"
#include "G4AutoDelete.hh"

#include "G4GeometryTolerance.hh"
#include "G4GeometryManager.hh"

#include "G4UserLimits.hh"

#include "G4VisAttributes.hh"
#include "G4Colour.hh"

#include "G4SystemOfUnits.hh"
#include "G4TessellatedSolid.hh"
#include "G4TriangularFacet.hh"
#include "Simulation.hh"

DetectorConstruction::DetectorConstruction()
    :G4VUserDetectorConstruction()
{
}
DetectorConstruction::DetectorConstruction(std::vector<Geometry*> geometries)
{
    this->geometries = geometries;
}
DetectorConstruction::DetectorConstruction(std::vector<Geometry*> geometries, Simulation* sim)
{
    this->geometries = geometries;
    this->simulation = sim;
    this->detectorid = 0;
}
DetectorConstruction::~DetectorConstruction()
{
    for (int i = 0; i < sensitiveDetectors.size(); i++) {
        delete sensitiveDetectors[i];
    }
}


G4VPhysicalVolume* DetectorConstruction::Construct()
{
    G4bool checkOverlaps = true;

    G4NistManager* nist = G4NistManager::Instance();
    clearDetectors();
    scoringVolumes.clear();
    G4double env_sizeXY = 2000 * cm, env_sizeZ = 3000 * cm;
    G4double world_sizeXY = 1.2 * env_sizeXY * cm;
    G4double world_sizeZ = 1.2 * env_sizeZ * cm;
    
    G4double atomicNumber = 1.;
    G4double massOfMole = 1.008 * g / mole;
    G4double density = 1.e-25 * g / cm3;
    G4double temperature = 2.73 * kelvin;
    G4double pressure = 3.e-18 * pascal;
    G4Material* Vacuum =
        new G4Material("qwe", atomicNumber,
            massOfMole, density, kStateGas,
            temperature, pressure);
    
    G4Box* solidWorld =
        new G4Box("World",0.5 * world_sizeXY, 0.5 * world_sizeXY, 0.5 * world_sizeZ);
    G4LogicalVolume* logicWorld =
        new G4LogicalVolume(solidWorld, Vacuum, "World");
    G4VPhysicalVolume* physWorld = new G4PVPlacement(0,G4ThreeVector(),logicWorld, "World",0, false,0,true);

    for (int j = 0; j < geometries.size(); j++) {
        G4Material* material = nist->FindOrBuildMaterial(geometries[j]->material);

        G4TessellatedSolid* tes = new G4TessellatedSolid("tracker");

        std::vector<float> data = geometries[j]->vertices;
        for (int i = 0; i < data.size() / 9; i++) {
            tes->AddFacet(new G4TriangularFacet(G4ThreeVector(data[i * 9] * geometries[j]->scale.x * cm, data[i * 9 + 1] * geometries[j]->scale.y * cm, data[i * 9 + 2] * geometries[j]->scale.z * cm),
                G4ThreeVector(data[i * 9 + 3] * geometries[j]->scale.x * cm, data[i * 9 + 4] * geometries[j]->scale.y * cm, data[i * 9 + 5] * geometries[j]->scale.z * cm),
                G4ThreeVector(data[i * 9 + 6] * geometries[j]->scale.x * cm, data[i * 9 + 7] * geometries[j]->scale.y * cm, data[i * 9 + 8] * geometries[j]->scale.z * cm), ABSOLUTE));
        }
        tes->SetSolidClosed(true);

        G4LogicalVolume* logicEnv =
            new G4LogicalVolume(tes, material, std::string("Chamber" + std::to_string(j)).c_str(), 0, 0, 0);

        
        G4RotationMatrix* rotation = new G4RotationMatrix();
        rotation->rotateX(-geometries[j]->rotation.x * rad);
        rotation->rotateY(-geometries[j]->rotation.y * rad);
        rotation->rotateZ(-geometries[j]->rotation.z * rad);

        new G4PVPlacement(rotation,
            G4ThreeVector(geometries[j]->position.x * cm, geometries[j]->position.y * cm, geometries[j]->position.z * cm),
            logicEnv, std::string("Detektor" + std::to_string(j)).c_str(), logicWorld, false, 0, checkOverlaps);

        scoringVolumes.push_back(logicEnv);

       

    }
    
    return physWorld;
}

void DetectorConstruction::clearDetectors()
{
    for (int i = 0; i < sensitiveDetectors.size(); i++) {
        delete sensitiveDetectors[i];
    }
}
void DetectorConstruction::ConstructSDandField()
{
    for (int i = 0; i < scoringVolumes.size(); i++) {
        detectorid++;
        SensitiveDetector* aTrackerSD = new SensitiveDetector(std::string("Tracker" + std::to_string(detectorid)).c_str(),
            std::string("TrackerHitsCollection" + std::to_string(detectorid)).c_str(), simulation);
        aTrackerSD->id = geometries[i]->id;
        sensitiveDetectors.push_back(aTrackerSD);
        
        G4SDManager::GetSDMpointer()->AddNewDetector(aTrackerSD);
        SetSensitiveDetector(scoringVolumes[i], aTrackerSD);
    }
}
