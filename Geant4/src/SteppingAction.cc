#pragma once
/*
	Ebbõl az osztályból érhetõek el a geant4 részecske trackek, ezeket átadja a simulation osztálynak
*/
#include "SteppingAction.hh"
#include "DetectorConstruction.hh"

#include "G4Step.hh"
#include "G4Event.hh"
#include "G4RunManager.hh"
#include "G4LogicalVolume.hh"
#include "Simulation.hh"

SteppingAction::SteppingAction(EventAction* eventAction)
: G4UserSteppingAction(),
  fScoringVolume(0)
{
	std::cout << "SteppingAction initialized succesfully\n";

}
SteppingAction::SteppingAction(Simulation* simulation)
	: G4UserSteppingAction(),
	fScoringVolume(0)
{
	std::cout << "SteppingAction initialized succesfully\n";

	this->simulation = simulation;
}

SteppingAction::~SteppingAction()
{}

void SteppingAction::UserSteppingAction(const G4Step* step)
{
	const DetectorConstruction* detectorConstruction
		= static_cast<const DetectorConstruction*>
		(G4RunManager::GetRunManager()->GetUserDetectorConstruction());
	std::vector<G4LogicalVolume*> scoringVolumes = detectorConstruction->GetAllScoringVolumes();

	if (!scoringVolumes.size()) return;

	G4LogicalVolume* volume
		= step->GetPreStepPoint()->GetTouchableHandle()
		->GetVolume()->GetLogicalVolume();

	
    simulation->addTrack(step);

	//step->GetTrack()->SetTrackStatus(fStopAndKill);
	
	int index = -1;
	for (int i = 0; i < scoringVolumes.size(); i++) {
		if (scoringVolumes[i] == volume) index = i;
	}
	if (index == -1) {
		return;
	}
	
	//simulation->addTrack(step);
	

	simulation->detectors[index]->energyDeposit += step->GetTotalEnergyDeposit();

	

}

