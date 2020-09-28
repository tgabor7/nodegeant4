#include "Simulation.hh"
#include "G4Step.hh"
#include "DetectorConstruction.hh"
#include "G4MTRunManager.hh"
#include "G4VModularPhysicsList.hh"
#include "ActionInitialization.hh"
#include "QBBC.hh"
#include "G4StepLimiterPhysics.hh"
#include "Geometry.hh"
#include "G4RunManager.hh";
#include "G4StateManager.hh"
#include "QGSP_BIC_HP.hh"
#include "QGSP_BERT_HP.hh"
#include "G4KleinNishinaModel.hh"

Simulation::Simulation(G4MTRunManager* runManager)
{
	this->runManager = runManager;
}
void Simulation::init()
{

}
void Simulation::clearDetectors()
{
	detectors.clear();
	de->clearGeometries();
}
void Simulation::addDetector(Geometry* d)
{
	de->addGeometry(d);
	detectors.push_back(d);
	runManager->ReinitializeGeometry();

}
void Simulation::addSource(ParticleSource* s)
{
	sources.push_back(s);
}
void Simulation::addGun(Gun* g)
{
	guns.push_back(g);
}
void Simulation::addTrack(const G4Step* s)
{
	
	//std::cout << s->GetPostStepPoint()->GetGlobalTime() << "\n";

	if (particle_tracks.size() == 1 && (activeTrack == s->GetTrack() || activeTrack == nullptr)) {

		Particle* first_hit = new Particle;
		first_hit->position.x = s->GetPostStepPoint()->GetPosition().getX();
		first_hit->position.y = s->GetPostStepPoint()->GetPosition().getY();
		first_hit->position.z = s->GetPostStepPoint()->GetPosition().getZ();
		first_hit->totalEnergy = s->GetPostStepPoint()->GetTotalEnergy();
		first_hit->kineticEnergy = s->GetPostStepPoint()->GetKineticEnergy();
		first_hit->energyDeposit = 0;

		particle_tracks[0]->track_id = 1;
		particle_tracks[0]->parent_id = 0;
		particle_tracks[0]->particles.push_back(first_hit);

		activeTrack = s->GetTrack();

		return;
	}

	if (!s->GetTrack()) {
		return;
	}
	if (activeTrack != s->GetTrack()) {
		currentTrack = new Track;
		currentTrack->definition = s->GetTrack()->GetDefinition()->GetParticleName();
		currentTrack->track_id = s->GetTrack()->GetTrackID();
		currentTrack->parent_id = s->GetTrack()->GetParentID();

		particle_tracks.push_back(currentTrack);

		Particle* p = new Particle();

		p->parent_id = s->GetTrack()->GetParentID();
		p->track_id = s->GetTrack()->GetTrackID();

		p->definition = s->GetTrack()->GetDefinition()->GetParticleName();

		p->totalEnergy = (double)s->GetPreStepPoint()->GetTotalEnergy();

		p->kineticEnergy = (double)s->GetTrack()->GetKineticEnergy();

		p->momentum.x = s->GetPreStepPoint()->GetMomentum().getX();
		p->momentum.y = s->GetPreStepPoint()->GetMomentum().getY();
		p->momentum.z = s->GetPreStepPoint()->GetMomentum().getZ();

		p->position.x = s->GetPreStepPoint()->GetPosition().getX();
		p->position.y = s->GetPreStepPoint()->GetPosition().getY();
		p->position.z = s->GetPreStepPoint()->GetPosition().getZ();

		p->energyDeposit = s->GetTotalEnergyDeposit();

		if (currentTrack) currentTrack->particles.push_back(p);

		Track* parent = getTrackByID(s->GetTrack()->GetParentID());

		if (parent) parent->next.push_back(currentTrack);


	}
	activeTrack = s->GetTrack();

	Particle* p1 = new Particle();

	p1->parent_id = activeTrack->GetParentID();
	p1->track_id = activeTrack->GetTrackID();



	p1->definition = activeTrack->GetDefinition()->GetParticleName();
	p1->totalEnergy = (double)s->GetPostStepPoint()->GetTotalEnergy();

	p1->kineticEnergy = (double)s->GetPostStepPoint()->GetKineticEnergy();

	p1->momentum.x = s->GetPostStepPoint()->GetMomentum().getX();
	p1->momentum.y = s->GetPostStepPoint()->GetMomentum().getY();
	p1->momentum.z = s->GetPostStepPoint()->GetMomentum().getZ();

	p1->position.x = s->GetPostStepPoint()->GetPosition().getX();
	p1->position.y = s->GetPostStepPoint()->GetPosition().getY();
	p1->position.z = s->GetPostStepPoint()->GetPosition().getZ();

	p1->energyDeposit = s->GetTotalEnergyDeposit();

	if (currentTrack) currentTrack->particles.push_back(p1);

}
Track* Simulation::getTrackByID(int i)
{
	for (int j = 0; j < particle_tracks.size(); j++) {
		if (particle_tracks[j]->track_id == i) return particle_tracks[j];
	}
	return nullptr;
}
std::stringstream Simulation::getSpectrum(Gun* gun, int number_of_particles, int spectrum_detector)
{
	

	runManager->ReinitializeGeometry();
	
	//physicsList->SetDefaultCutValue(1000);
	
	std::vector<Track*> finalTracks;


	std::stringstream ss;
	std::cout << "sources: " << sources.size() << "\n";
	std::ofstream f("particles.txt");

	for (int l = 0; l < number_of_particles; l++) {
		active_gun->active = false;
		active_source->active = true;

		for (int j = 0; j < sources.size(); j++) {
			updateSource(sources[j]);
			for (int i = 0; i < particle_tracks.size(); i++) {
				//particle_tracks[i]->particles.clear();
				//delete particle_tracks[i];
			}
			particle_tracks.clear();
			activeTrack = nullptr;

			Particle* gun_particle = new Particle();
			gun_particle->position.x = sources[j]->position.z;
			gun_particle->position.y = sources[j]->position.y;
			gun_particle->position.z = sources[j]->position.x;


			gun_particle->totalEnergy = sources[j]->getEnergy() * 0.001;

			Track* primary = new Track;

			gun_particle->definition = "gamma";

			primary->particles.push_back(gun_particle);

			primary->definition = gun_particle->definition;
			particle_tracks.push_back(primary);
			runManager->BeamOn(1);
			/*for (int k = 0; k < particle_tracks.size(); k++) {
				finalTracks.push_back(particle_tracks[k]);
			}
			*/
		}
		active_source->active = false;
		active_gun->active = true;

		for (int j = 0; j < guns.size(); j++) {
			updateGun(guns[j]);
			
			for (int i = 0; i < particle_tracks.size(); i++) {
				//particle_tracks[i]->particles.clear();
			}
			particle_tracks.clear();
			activeTrack = nullptr;

			Particle* gun_particle = new Particle();
			gun_particle->position.x = guns[j]->position.z;
			gun_particle->position.y = guns[j]->position.y;
			gun_particle->position.z = guns[j]->position.x;


			gun_particle->totalEnergy = guns[j]->energy;

			Track* primary = new Track;

			gun_particle->definition = "gamma";

			primary->particles.push_back(gun_particle);

			primary->definition = gun_particle->definition;
			particle_tracks.push_back(primary);

			runManager->BeamOn(1);

			/*for (int k = 0; k < particle_tracks.size(); k++) {
				finalTracks.push_back(particle_tracks[k]);
			}*/

		}
		for (int i = 0; i < detectors.size(); i++) {
			if (spectrum_detector == detectors[i]->id) {
				//f << detectors[i]->energyDeposit << "\n";
				if (detectors[i]->energyDeposit > 0) {
					ss << detectors[i]->energyDeposit*1000 << " ";
					f << detectors[i]->energyDeposit*1000 << "\n";
				}
				detectors[i]->energyDeposit = 0;
			}
			
		}
	}
	/*for (int i = 0; i < finalTracks.size(); i++) {
		for (int j = 0; j < finalTracks[i]->particles.size(); j++) {
			ss << finalTracks[i]->particles[j]->energyDeposit;
			ss << " ";

		}
	}*/
	ss << " ";
	
	for (int i = 0; i < finalTracks.size(); i++) {
		delete finalTracks[i];
	}

	for (int i = 0; i < detectors.size(); i++) {
		std::cout << "\nEnergyDeposit: " << detectors[i]->energyDeposit << "MeV\n";
	}
	
	f.close();

	return ss;
}
void Simulation::clearSources()
{
	sources.clear();
}
void Simulation::clearGuns()
{
	guns.clear();
}
std::stringstream Simulation::run(Gun *gun, int numberofparticles)
{
	//at least 1 detector and gun has to be added
	out = std::ofstream("particles.txt");
	runManager->ReinitializeGeometry();
	
	std::vector<Track*> finalTracks;
	//physicsList->SetDefaultCutValue(1);
	std::stringstream ss;
	std::cout << "sources: " << sources.size() << "\n";
	for (int l = 0; l < numberofparticles; l++) {

		active_source->active = true;
		active_gun->active = false;

		for (int j = 0; j < sources.size(); j++) {
			updateSource(sources[j]);
			
			for (int i = 0; i < particle_tracks.size(); i++) {
				//particle_tracks[i]->particles.clear();
			}
			particle_tracks.clear();
			activeTrack = nullptr;

			Particle* gun_particle = new Particle();
			gun_particle->position.x = sources[j]->position.z;
			gun_particle->position.y = sources[j]->position.y;
			gun_particle->position.z = sources[j]->position.x;


			gun_particle->totalEnergy = sources[j]->getEnergy() * 0.001;

			Track* primary = new Track;

			gun_particle->definition = "gamma";

			primary->particles.push_back(gun_particle);

			primary->definition = gun_particle->definition;
			particle_tracks.push_back(primary);

			runManager->BeamOn(1);

			for (int k = 0; k < particle_tracks.size(); k++) {
				finalTracks.push_back(particle_tracks[k]);
			}
			//print(particle_tracks[0], 0);
		}
		active_source->active = false;
		active_gun->active = true;

		for (int j = 0; j < guns.size(); j++) {
			updateGun(guns[j]);
			
			for (int i = 0; i < particle_tracks.size(); i++) {
				//particle_tracks[i]->particles.clear();
			}
			particle_tracks.clear();
			activeTrack = nullptr;

			Particle* gun_particle = new Particle();
			gun_particle->position.x = guns[j]->position.z;
			gun_particle->position.y = guns[j]->position.y;
			gun_particle->position.z = guns[j]->position.x;


			gun_particle->totalEnergy = guns[j]->energy * 0.001;

			Track* primary = new Track;

			gun_particle->definition = "gamma";

			primary->particles.push_back(gun_particle);

			primary->definition = gun_particle->definition;
			particle_tracks.push_back(primary);

			runManager->BeamOn(1);

			for (int k = 0; k < particle_tracks.size(); k++) {
				finalTracks.push_back(particle_tracks[k]);
			}
			//print(particle_tracks[0], 0);
		}
	}

	for (int i = 0; i < finalTracks.size(); i++) {
		ss << finalTracks[i]->particles.size();
		ss << " ";
		ss << finalTracks[i]->definition;
		ss << " ";
		for (int j = 0; j < finalTracks[i]->particles.size(); j++) {
			ss << finalTracks[i]->particles[j]->position.x;
			ss << " ";
			ss << finalTracks[i]->particles[j]->position.y;
			ss << " ";
			ss << finalTracks[i]->particles[j]->position.z;
			ss << " ";
			ss << finalTracks[i]->particles[j]->track_id;
			ss << " ";
			ss << finalTracks[i]->particles[j]->parent_id;
			ss << " ";
			ss << finalTracks[i]->particles[j]->totalEnergy;
			ss << " ";
			ss << finalTracks[i]->particles[j]->energyDeposit;
			ss << " ";
		}
	}
	ss << " ";
	for (int i = 0; i < detectors.size(); i++) {
		ss << detectors[i]->energyDeposit;
		ss << " ";
	}
	//print(finalTracks[0], 0);
	/*for (int i = 0; i < finalTracks.size(); i++) {
		print(finalTracks[i], 0);
	}*/
	//writeToFile(finalTracks[0], 0);
	
	for (int i = 0; i < detectors.size(); i++) {
		std::cout << "\nEnergyDeposit: " << detectors[i]->energyDeposit << "MeV\n";
	}
	return ss;
}
void Simulation::print(Track* t, int depth)
{
	std::cout << "\n\n";
	for (int j = 0; j < depth; j++) {
		std::cout << "\t";
	}
	std::cout << "Definition: " << t->definition << ", track_id: " << t->track_id << ", parent_id: " << t->parent_id << "\n";
	depth++;
	for (int i = 0; i < t->particles.size(); i++) {
		std::cout << "\n";
		for (int j = 0; j < depth; j++) {
			std::cout << "\t";
		}
		std::cout << "Position: " << t->particles[i]->position.x << ", " << t->particles[i]->position.y << ", " << t->particles[i]->position.z << ", TotalEnergy: "
			<< t->particles[i]->totalEnergy << ", EnergyDeposit: " << t->particles[i]->energyDeposit << " Momentum: " << t->particles[i]->momentum.x << ", " <<
			t->particles[i]->momentum.y << ", " << t->particles[i]->momentum.z << "\n";
	}
	for (int i = 0; i < t->next.size(); i++) {
		print(t->next[i], depth);
	}
}
void Simulation::writeToFile(Track* t, int depth)
{
	
	out << "\n\n";
	for (int j = 0; j < depth; j++) {
		out << "\t";
	}
	out << "Definition: " << t->definition << ", track_id: " << t->track_id << ", parent_id: " << t->parent_id << "\n";
	depth++;
	for (int i = 0; i < t->particles.size(); i++) {
		out << "\n";
		for (int j = 0; j < depth; j++) {
			out << "\t";
		}
		out << "Position: " << t->particles[i]->position.x << ", " << t->particles[i]->position.y << ", " << t->particles[i]->position.z << ", TotalEnergy: "
			<< t->particles[i]->totalEnergy << ", EnergyDeposit: " << t->particles[i]->energyDeposit << " Momentum: " << t->particles[i]->momentum.x << ", " <<
			t->particles[i]->momentum.y << ", " << t->particles[i]->momentum.z << "\n";
	}
	for (int i = 0; i < t->next.size(); i++) {
		writeToFile(t->next[i], depth);
	}
}
Simulation::Simulation()
{
	runManager = new G4MTRunManager;
	//runManager->SetVerboseLevel(4);
	runManager->SetNumberOfThreads(2);
	activeTrack = nullptr;
	currentTrack = nullptr;
	
	
	de = new DetectorConstruction(detectors);
	runManager->SetUserInitialization(de);

	
	physicsList = new QBBC;
	
	//physicsList->RegisterPhysics(new G4StepLimiterPhysics());
	//physicsList->SetDefaultCutValue(1000);
	runManager->SetUserInitialization(physicsList);

	active_gun = new Gun();
	active_gun->energy = 10;
	active_gun->definition = GAMMA;
	
	active_gun->position.x = 10;
	active_gun->direction.x = -1;

	active_source = new ParticleSource(vector3(100),"U235");

	ActionInitialization* action = new ActionInitialization(this, active_gun, active_source);
	runManager->SetUserInitialization(action);

	
	runManager->Initialize();
	
	

}
void Simulation::updateSource(ParticleSource* source)
{
	this->active_source->source = source->source;
	this->active_source->material = source->material;
	this->active_source->reinit(source->material);
	this->active_source->position.x = source->position.z;
	this->active_source->position.y = source->position.y;
	this->active_source->position.z = source->position.x;

}
void Simulation::updateGun(Gun* gun)
{
	this->active_gun->energy = gun->energy;

	this->active_gun->position.x = gun->position.z;
	this->active_gun->position.y = gun->position.y;
	this->active_gun->position.z = gun->position.x;

	this->active_gun->direction.x = gun->direction.z;
	this->active_gun->direction.y = gun->direction.y;
	this->active_gun->direction.z = gun->direction.x;

}
Simulation::~Simulation()
{
	delete runManager;


}