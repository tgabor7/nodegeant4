#include "RunAction.hh"

#include "G4Run.hh"
#include "G4RunManager.hh"


RunAction::RunAction()
	: G4UserRunAction()
{
}


RunAction::~RunAction()
{}


void RunAction::BeginOfRunAction(const G4Run*)
{
}


void RunAction::EndOfRunAction(const G4Run*)
{}

