#include "ParticleSource.hh"
#include "cpp_api.h"
#include "G4UniformRandPool.hh"

ParticleSource::ParticleSource() {}
ParticleSource::ParticleSource(vector3 position, std::string material)
{
	this->position = position;
	this->material = material;
	std::cout << "Material: " << material << "\n";
	std::stringstream ss;
	ss << material;
	ss << " 100.0";
	source = radsrc::CApi::newSource();
	radsrc::CApi::addConfig(source, ss.str());
	radsrc::CApi::addConfig(source, "AGE 20.0");

	radsrc::CApi::sourceConfig(source);

	
}
void ParticleSource::reinit(std::string material) {
	std::stringstream ss;
	ss << material;
	ss << " 100.0";
	source = radsrc::CApi::newSource();
	radsrc::CApi::addConfig(source, ss.str());
	radsrc::CApi::addConfig(source, "AGE 20.0");

	radsrc::CApi::sourceConfig(source);
}
double ParticleSource::localran(void)
{
	return G4UniformRand();
}
double ParticleSource::getEnergy()
{
	return radsrc::CApi::getPhoton(source, localran);
}
ParticleSource::~ParticleSource() {}