#include "SensitiveDetector.hh"
#include "G4HCofThisEvent.hh"
#include "G4Step.hh"
#include "G4ThreeVector.hh"
#include "G4SDManager.hh"
#include "G4ios.hh"
#include "Simulation.hh"

SensitiveDetector::SensitiveDetector(const G4String& name,
    const G4String& hitsCollectionName)
    : G4VSensitiveDetector(name),
    fHitsCollection(NULL)
{
    collectionName.insert(hitsCollectionName);
    edep = 0;
    //std::cout << "\nCreated sensitive dtector\n";
}
SensitiveDetector::SensitiveDetector(const G4String& name,
    const G4String& hitsCollectionName, Simulation* sim)
    : G4VSensitiveDetector(name),
    fHitsCollection(NULL)
{
    collectionName.insert(hitsCollectionName);
    edep = 0;
    //std::cout << "\nCreated sensitive dtector\n";
    simulation = sim;
}
SensitiveDetector::~SensitiveDetector()
{}

void SensitiveDetector::Initialize(G4HCofThisEvent* hce)
{
    // Create hits collection

     fHitsCollection = new TrackerHitsCollection(SensitiveDetectorName, collectionName[0]);


  G4int hcID = G4SDManager::GetSDMpointer()->GetCollectionID(collectionName[0]);
    hce->AddHitsCollection(hcID, fHitsCollection);
}
G4bool SensitiveDetector::ProcessHits(G4Step* aStep,
    G4TouchableHistory*)
{
    // energy deposit
    G4double edep = aStep->GetTotalEnergyDeposit();
    simulation->addTrack(aStep);
    this->edep += edep;
    if (edep == 0.) return false;

    TrackerHit* newHit = new TrackerHit();

    newHit->trackID = aStep->GetTrack()->GetTrackID();
    
    newHit->edep = edep;
    newHit->position.x = aStep->GetPostStepPoint()->GetPosition().getX();
    newHit->position.y = aStep->GetPostStepPoint()->GetPosition().getY();
    newHit->position.z = aStep->GetPostStepPoint()->GetPosition().getZ();

    newHit->definition = aStep->GetTrack()->GetDefinition()->GetParticleName();
    newHit->parentID = aStep->GetTrack()->GetParentID();


    fHitsCollection->insert(newHit);
    hits.push_back(newHit);
    //newHit->Print();
    return true;
}

void SensitiveDetector::EndOfEvent(G4HCofThisEvent*)
{
   
}
