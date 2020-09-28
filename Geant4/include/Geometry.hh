/*
	A detektor geometri�j�t meghat�roz� oszt�ly
*/

#pragma once
#include "Maths.hh"
#include <vector>
#include "G4Material.hh"

class Geometry {
public:
	Geometry() {}
	~Geometry() {}
	Geometry(std::vector<float> data); 
	
	std::vector<float> vertices;
	
	std::string material;
	int id;
	double energyDeposit = 0.0;
	vector3 position;
	vector3 rotation;
	vector3 scale;
};