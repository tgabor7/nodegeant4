#pragma once
#include "G4ThreeVector.hh"
#include "G4Material.hh"

class Detektor
{
public:
	Detektor();
	~Detektor();
private:
	G4ThreeVector position;
	G4ThreeVector rotation;
	G4ThreeVector scale;
};

