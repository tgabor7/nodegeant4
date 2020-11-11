#include "PrimaryGeneratorAction.hh"
#include "G4LogicalVolumeStore.hh"
#include "G4LogicalVolume.hh"
#include "G4Box.hh"
#include "G4RunManager.hh"
#include "G4ParticleGun.hh"
#include "G4ParticleTable.hh"
#include "G4ParticleDefinition.hh"
#include "G4SystemOfUnits.hh"
#include "Randomize.hh"
#include "G4UniformRandPool.hh"
#include "radsource.h"
#include "cpp_api.h"
#include "G4UniformRandPool.hh"


PrimaryGeneratorAction::PrimaryGeneratorAction()
: G4VUserPrimaryGeneratorAction(),
  fParticleGun(0), 
  fEnvelopeBox(0)
{
  G4int n_particle = 1;
  fParticleGun  = new G4ParticleGun(n_particle);

  // default particle kinematic
  G4ParticleTable* particleTable = G4ParticleTable::GetParticleTable();
  G4String particleName;
  G4ParticleDefinition* particle
    = particleTable->FindParticle(particleName="e-");
  fParticleGun->SetParticleDefinition(particle);
  fParticleGun->SetParticleMomentumDirection(G4ThreeVector(0.,0,-1.));
  fParticleGun->SetParticleEnergy(6.*eV);
}
double PrimaryGeneratorAction::localran(void)
{
	return G4UniformRand();
}
PrimaryGeneratorAction::PrimaryGeneratorAction(Gun *gun, ParticleSource *source)
	: G4VUserPrimaryGeneratorAction(),
	fParticleGun(0),
	fEnvelopeBox(0)
{
	G4int n_particle = 1;
	fParticleGun = new G4ParticleGun(n_particle);

	// default particle kinematic
	G4ParticleTable* particleTable = G4ParticleTable::GetParticleTable();
	G4String particleName;
	G4ParticleDefinition* particle;
	switch (gun->definition)
	{
	case(GAMMA):
		particle = particleTable->FindParticle(particleName = "gamma");
		break;
	case(ELECTRON):
		particle = particleTable->FindParticle(particleName = "e-");
		break;
	case(POSITRON):
		particle = particleTable->FindParticle(particleName = "e+");
		break;
	default:
		break;
	}
		
	fParticleGun->SetParticleDefinition(particle);
	fParticleGun->SetParticleEnergy(source->getEnergy());

	this->gun = gun;
	this->source = source;
	try {
		//int success = radsrc::CApi::sourceConfig(pRadSource);
		radsrc::CRadSource* pRadSource = radsrc::CApi::newSource();
		//radsrc::CApi::addConfig(pRadSource, "Co60 80.0");
		radsrc::CApi::addConfig(pRadSource, "U235 100.0");
		
		//radsrc::CPhotonComputer::getLineIntensity()
		
		radsrc::CApi::addConfig(pRadSource,"AGE 20.0");

		int t1Good = radsrc::CApi::sourceConfig(pRadSource);
		
		//std::cout << "\nt1Good:" << t1Good << "\n";
		
		std::ofstream s("U235.txt");

		s << "\n\n////////////////////////////////////////////////////////////////////////////\n\n";
		double e = radsrc::CApi::getPhoton(pRadSource, localran);
		
		/*double (*line)[2];

		radsrc::CApi::getLines(pRadSource,line, 100);

		for (int i = 0; i < 100; i++) {
			std::cout << "line: " << line[0][0] << "kev , " << line[0][1];

			std::cout << "\n";
		}*/
		
			
		
		radsrc::CDecayComputer com = pRadSource->getDecayComputer();
		
		//Photon probability of emission per decay
		
		radsrc::CIsotope iso;
		iso.fromString("U235");
		s << iso.isValid() << " ";
		radsrc::DecayChainSet dc = com.computeDecayChains(iso);
		
		
			
		for (int j = 0; j < dc.size(); j++) {
			s << "\n";
			for (int k = 0; k < dc[j].size(); k++) {
				s << "\n";
				s << "Z: " << dc[j][k].m_Parent.getAtomicNumber() << " A: " << dc[j][k].m_Parent.getMassNumber() << "MetastableNumber: " << dc[j][k].m_Parent.getMetastableNumber() << "\n";
				
				if (dc[j][k].m_pDecay != nullptr) {
					s << "branch fraction: " << dc[j][k].m_pDecay->getBranchFraction() << "\n";
					s << "decay type: " << dc[j][k].m_pDecay->getDecayType() << "\n";
					s << "daughter: " << "A: " <<
						dc[j][k].m_pDecay->getDaughter().getAtomicNumber() << " Z: " << dc[j][k].m_pDecay->getDaughter().getMassNumber() << " MetaStableNumber: " <<
						dc[j][k].m_pDecay->getDaughter().getMetastableNumber() << "\n";


					if (dc[j][k].m_pDecay->getNPhotons() == 0) continue;
					for (int n = 0; n < dc[j][k].m_pDecay->getNPhotons(); n++) {
						s << dc[j][k].m_pDecay->beginPhotons()[n].getEnergy() << "kev fraction: " << 
							dc[j][k].m_pDecay->beginPhotons()[n].getFraction() << ", ";
					}
				}
				s << "\n";
				
			}
		}


		s << e << "\n";
			
			
		
		s << "\n" << pRadSource->getReport();
		s.close();

	}
	catch (radsrc::CRadSourceException e) {
	}
	

	//std::cout << "succes: " << success << "\n";
}

PrimaryGeneratorAction::~PrimaryGeneratorAction()
{
  delete fParticleGun;
}
void PrimaryGeneratorAction::GeneratePrimaries(G4Event* anEvent)
{
	if (source->active) {
		fParticleGun->SetParticleEnergy(source->getEnergy()*keV);
		G4double phi = 2.0 * PI * G4UniformRand();
		G4double costheta = 2.0 * G4UniformRand() - 1.0;
		G4double sintheta = pow(1.0 - pow(costheta, 2.0), 0.5);
		G4double r = 0.0000001 * pow(G4UniformRand(), 1.0 / 3.0);



		fParticleGun->SetParticlePosition(G4ThreeVector(source->position.x, source->position.y, source->position.z));
		//fParticleGun->SetParticleMomentumDirection(G4ThreeVector(G4UniformRand() - .5, G4UniformRand() - .5, -1));
		fParticleGun->SetParticleMomentumDirection(G4ThreeVector(costheta, sintheta * cos(phi), sintheta * sin(phi)));
		fParticleGun->GeneratePrimaryVertex(anEvent);

		//figyeld a kezem mert csalok
		//fParticleGun->SetParticlePosition(G4ThreeVector(source->position.x, source->position.y, source->position.z));
		//fParticleGun->SetParticleMomentumDirection(G4ThreeVector(G4UniformRand() - .5, G4UniformRand() - .5, -1));


		/*double x = (G4UniformRand() - .5) * 2;
		double y = (G4UniformRand() - .5) * 2;
		double z = 1;

		fParticleGun->SetParticleMomentumDirection(G4ThreeVector(x, y, z));
		fParticleGun->GeneratePrimaryVertex(anEvent);*/
	}
	if(gun->active){
		fParticleGun->SetParticleEnergy(gun->energy * eV);

		fParticleGun->SetParticlePosition(G4ThreeVector(gun->position.x, gun->position.y, gun->position.z));
		//fParticleGun->SetParticleMomentumDirection(G4ThreeVector(G4UniformRand() - .5, G4UniformRand() - .5, -1));
		fParticleGun->SetParticleMomentumDirection(G4ThreeVector(gun->direction.x,gun->direction.y,gun->direction.z));
		fParticleGun->GeneratePrimaryVertex(anEvent);
	}
  
}