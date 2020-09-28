#pragma once
#include "Maths.hh"
#include "radsource.h"

enum errors {
	COULDNT_CREATE_SOURCE
};
class ParticleSource {
public:
	ParticleSource();
	ParticleSource(vector3 position, std::string material);
	vector3 position;
	std::string material;
	double getEnergy();
	radsrc::CRadSource* source;
	void reinit(std::string material);
	bool active;
	~ParticleSource();
private:
	static double localran(void);
};