/*
	Ebben az oszt�lyban inicializ�ljuk a geant4 �ltal adatfeldoz� oszt�lyokat
*/

#pragma once

#include "G4VUserActionInitialization.hh"
#include <vector>
#include "Maths.hh"
#include "PrimaryGeneratorAction.hh"

class Simulation;
class Gun;

class ActionInitialization : public G4VUserActionInitialization
{
  public:
    ActionInitialization();
	ActionInitialization(Simulation* simulation,Gun *gun,ParticleSource* source);
    virtual ~ActionInitialization();
    virtual void BuildForMaster() const;
    virtual void Build() const;
private:
	Simulation* simulation;
	PrimaryGeneratorAction* primarygenerator;
	
};