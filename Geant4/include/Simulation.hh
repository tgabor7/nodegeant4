/*
	Ez az osztály kezeli a részecske szimulációt
*/
#pragma once

#include "Detektor.hh"
#include "Particle.hh"
#include "Geometry.hh"
#include "ParticleSource.hh"
#include "Gun.hh"
#include <string>
#include "G4VModularPhysicsList.hh"
#include <fstream>

#define NUMBER_OF_SAMPLES 5000

class G4Step;
class G4Track;
class DetectorConstruction;
class G4MTRunManager;

class Simulation {
public:
	Simulation();
	Simulation(std::vector<Geometry*> detectors);
	Simulation(G4MTRunManager*);
	void init();
	void addDetector(Geometry* d); // detector hozzáadása a rendszerhez
	void addSource(ParticleSource* s);
	void clearDetectors(); // törli az összes detektort
	void clearSources();
	void clearGuns();
	void addGun(Gun* gun);
	void updateGun(Gun *gun); // frissíti a részecske ágyú helyzetét, irányát, a részecske energiáját és typusát
	void updateSource(ParticleSource* source);
	void addTrack(const G4Step*); // 
	std::stringstream run(Gun* gun,int number_of_particles, std::ofstream&); // feldolgozza a kapott adatot, amit majd a server visszaküldi
	std::stringstream getSpectrum(Gun* gun,int number_of_particles, int detector_id); // feldolgozza a kapott adatot, amit majd a server visszaküldi
	std::vector<Geometry*> detectors;
	std::vector<ParticleSource*> sources;
	std::vector<Gun*> guns;
	G4MTRunManager* runManager;
	~Simulation();
private:
	std::vector<Track*> particle_tracks;
	Track* getTrackByID(int i);
	Track* currentTrack;
	const G4Track* activeTrack;
	Gun* active_gun;
	ParticleSource* active_source;
	void print(Track* t, int depth);
	void writeToFile(Track* t, int depth);

	DetectorConstruction* de;
	std::vector<double> times;
	G4VModularPhysicsList* physicsList;

	std::ofstream out;
	
};