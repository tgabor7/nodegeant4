#pragma once

#include "G4VHit.hh"
#include "G4THitsCollection.hh"
#include "G4Allocator.hh"
#include "G4ThreeVector.hh"
#include "tls.hh"
#include "Maths.hh"
#include <string>

class TrackerHit : public G4VHit
{
public:
    TrackerHit();
    TrackerHit(const TrackerHit&);
    virtual ~TrackerHit();

    const TrackerHit& operator=(const TrackerHit&);
    G4bool operator==(const TrackerHit&) const;

    inline void* operator new(size_t);
    inline void  operator delete(void*);

    int trackID;
    vector3 position;
    double edep;
    double totalenergy;
    std::string definition;
    int parentID;

private:
};

typedef G4THitsCollection<TrackerHit> TrackerHitsCollection;

extern G4ThreadLocal G4Allocator<TrackerHit>* TrackerHitAllocator;

inline void* TrackerHit::operator new(size_t)
{
    if (!TrackerHitAllocator)
        TrackerHitAllocator = new G4Allocator<TrackerHit>;
    return (void*)TrackerHitAllocator->MallocSingle();
}

inline void TrackerHit::operator delete(void* hit)
{
    TrackerHitAllocator->FreeSingle((TrackerHit*)hit);
}
