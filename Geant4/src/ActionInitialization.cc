#include "ActionInitialization.hh"
#include "PrimaryGeneratorAction.hh"
#include "SteppingAction.hh"
#include "Simulation.hh"
#include "EventAction.hh"
#include "RunAction.hh"

ActionInitialization::ActionInitialization()
 : G4VUserActionInitialization()
{}
ActionInitialization::ActionInitialization(Simulation* megjelenites,Gun *gun,ParticleSource* source)
	: G4VUserActionInitialization()
{
	primarygenerator = new PrimaryGeneratorAction(gun, source);
	this->simulation = megjelenites;
}
ActionInitialization::~ActionInitialization()
{}

void ActionInitialization::BuildForMaster() const
{
	SetUserAction(new RunAction);
}
void ActionInitialization::Build() const
{
	SetUserAction(primarygenerator);

	//SteppingAction* steppingAction = new SteppingAction(simulation);

	//SetUserAction(steppingAction);
	//SetUserAction(new RunAction);
	//SetUserAction(new EventAction);
}