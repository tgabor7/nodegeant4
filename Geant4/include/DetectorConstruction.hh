#pragma once
#include "globals.hh"
#include "G4VUserDetectorConstruction.hh"
#include "tls.hh"
#include "Geometry.hh"
#include "SensitiveDetector.hh"

class G4VPhysicalVolume;
class G4LogicalVolume;
class G4Material;
class G4UserLimits;
class G4GlobalMagFieldMessenger;
class Simulation;

class DetectorConstruction : public G4VUserDetectorConstruction
{
public:
    DetectorConstruction();
    DetectorConstruction(std::vector<Geometry*> geometries);
    DetectorConstruction(std::vector<Geometry*> geometries,Simulation*);
    virtual ~DetectorConstruction();
    void clearDetectors();

public:
    virtual G4VPhysicalVolume* Construct();
    virtual void ConstructSDandField();

    std::vector<SensitiveDetector*> sensitiveDetectors;
    std::vector<Geometry*> geometries;

private:
    std::vector<G4LogicalVolume*> scoringVolumes;
    Simulation* simulation;
    int detectorid;
    
};

