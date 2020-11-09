#pragma once
/*
	Ebbõl az osztályból érhetõek el a geant4 részecske trackek, ezeket átadja a simulation osztálynak
*/
#include "SteppingAction.hh"

#include "G4Step.hh"
#include "G4Event.hh"
#include "G4RunManager.hh"
#include "G4LogicalVolume.hh"
#include "Simulation.hh"

SteppingAction::SteppingAction(EventAction* eventAction)
: G4UserSteppingAction(),
  fScoringVolume(0)
{
	//std::cout << "SteppingAction initialized succesfully\n";

}
SteppingAction::SteppingAction(Simulation* simulation)
	: G4UserSteppingAction(),
	fScoringVolume(0)
{
	//std::cout << "SteppingAction initialized succesfully\n";

	this->simulation = simulation;
}

SteppingAction::~SteppingAction()
{}

void SteppingAction::UserSteppingAction(const G4Step* step)
{
	

	

}

