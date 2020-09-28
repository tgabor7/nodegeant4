#pragma once

#include "DetectorConstruction.hh"
#include "G4UserLimits.hh"
#include "G4RunManager.hh"
#include "G4NistManager.hh"
#include "G4Box.hh"
#include "G4Cons.hh"
#include "G4Orb.hh"
#include "G4Sphere.hh"
#include "G4Trd.hh"
#include "G4LogicalVolume.hh"
#include "G4PVPlacement.hh"
#include "G4SystemOfUnits.hh"
#include "G4TessellatedSolid.hh"
#include "G4TriangularFacet.hh"
#include "G4SDManager.hh"


DetectorConstruction::DetectorConstruction()
: G4VUserDetectorConstruction()
{ 
	
}
DetectorConstruction::DetectorConstruction(std::vector<Geometry*> gs)
	: G4VUserDetectorConstruction()
{
	this->geometries = gs;
}
void DetectorConstruction::addGeometry(Geometry* g)
{
	this->geometries.push_back(g);
}
void DetectorConstruction::clearGeometries()
{
	this->geometries.clear();
	/*for (int i = 0; i < scoringVolumes.size(); i++) {
		delete scoringVolumes[i];
	}*/
	scoringVolumes.clear();
}
DetectorConstruction::~DetectorConstruction()
{ }

G4VPhysicalVolume* DetectorConstruction::Construct()
{  
  G4NistManager* nist = G4NistManager::Instance();
  

  G4double env_sizeXY = 2000*cm, env_sizeZ = 3000*cm;
  

  G4bool checkOverlaps = true;


  G4double world_sizeXY = 1.2*env_sizeXY*cm;
  G4double world_sizeZ  = 1.2*env_sizeZ*cm;
  G4Material* world_mat = nist->FindOrBuildMaterial("G4_AIR");
  
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
    new G4Box("World",                       //its name
       0.5*world_sizeXY, 0.5*world_sizeXY, 0.5*world_sizeZ);     //its size
      
  G4LogicalVolume* logicWorld =                         
    new G4LogicalVolume(solidWorld,          //its solid
        Vacuum,           //its material
                        "World");            //its name
                             
  G4VPhysicalVolume* physWorld = 
    new G4PVPlacement(0,                     //no rotation
                      G4ThreeVector(),       //at (0,0,0)
                      logicWorld,            //its logical volume
                      "World",               //its name
                      0,                     //its mother  volume
                      false,                 //no boolean operation
                      0,                     //copy number
                      checkOverlaps);        //overlaps checking
                     
  
  
  /*G4UserLimits* limit = new G4UserLimits();
  limit->SetUserMaxTrackLength(0);
  logicWorld->SetUserLimits(limit);*/

  for (int j = 0; j < geometries.size(); j++) {
	  G4Material* material = nist->FindOrBuildMaterial(geometries[j]->material);
      
      std::cout << "\nDensity: " << material->GetDensity() << "\n\n";

	  G4TessellatedSolid* tes = new G4TessellatedSolid();
	 
	  std::vector<float> data = geometries[j]->vertices;
	  for (int i = 0; i < data.size() / 9; i++) {
		  tes->AddFacet(new G4TriangularFacet(G4ThreeVector(data[i*9] * geometries[j]->scale.x*cm, data[i * 9 + 1] * geometries[j]->scale.y*cm, data[i * 9 + 2] * geometries[j]->scale.z*cm),
			  G4ThreeVector(data[i * 9 + 3] * geometries[j]->scale.x*cm, data[i * 9 + 4] * geometries[j]->scale.y*cm, data[i * 9 + 5] * geometries[j]->scale.z*cm),
			  G4ThreeVector(data[i * 9 + 6] * geometries[j]->scale.x*cm, data[i * 9 + 7] * geometries[j]->scale.y*cm, data[i * 9 + 8] * geometries[j]->scale.z*cm), ABSOLUTE));
	  }
	  tes->SetSolidClosed(true);
	 
	  G4LogicalVolume* logicEnv =
		  new G4LogicalVolume(tes, material, std::string("Detektor" + std::to_string(j)).c_str());

      /*limit->SetUserMaxTrackLength(10000);
      logicEnv->SetUserLimits(limit);*/

	  G4RotationMatrix* rotation = new G4RotationMatrix();
	  rotation->rotateX(-geometries[j]->rotation.x * rad);
	  rotation->rotateY(-geometries[j]->rotation.y * rad);
	  rotation->rotateZ(-geometries[j]->rotation.z * rad);

	  new G4PVPlacement(rotation,
		  G4ThreeVector(geometries[j]->position.x*cm, geometries[j]->position.y*cm, geometries[j]->position.z*cm),
		  logicEnv, std::string("Detektor" + std::to_string(j)).c_str(),logicWorld,false,0, checkOverlaps); 

      
	  scoringVolumes.push_back(logicEnv);

  }
  return physWorld;
}
