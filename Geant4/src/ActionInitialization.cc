#include "ActionInitialization.hh"
#include "PrimaryGeneratorAction.hh"
#include "SteppingAction.hh"
#include "Simulation.hh"


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
 
}
void ActionInitialization::Build() const
{
  SetUserAction(primarygenerator);


  
  SteppingAction* steppingAction = new SteppingAction(simulation);
  
  SetUserAction(steppingAction);
}