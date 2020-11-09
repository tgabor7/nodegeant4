#pragma once

#include "G4VSensitiveDetector.hh"

#include "TrackerHit.hh"

#include <vector>


class G4Step;
class G4HCofThisEvent;
class Simulation;

class SensitiveDetector : public G4VSensitiveDetector
{
public:
    SensitiveDetector(const G4String& name,
        const G4String& hitsCollectionName);
    SensitiveDetector(const G4String& name,
        const G4String& hitsCollectionName, Simulation* sim);
    virtual ~SensitiveDetector();

    // methods from base class
    virtual void   Initialize(G4HCofThisEvent* hitCollection);
    virtual G4bool ProcessHits(G4Step* step, G4TouchableHistory* history);
    virtual void   EndOfEvent(G4HCofThisEvent* hitCollection);

    double edep;
    int id;
    TrackerHitsCollection* fHitsCollection;
    std::vector<TrackerHit*> hits;

private:
    Simulation* simulation;
};
