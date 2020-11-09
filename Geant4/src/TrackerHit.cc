#include "TrackerHit.hh"
#include "G4UnitsTable.hh"
#include "G4VVisManager.hh"
#include "G4Circle.hh"
#include "G4Colour.hh"
#include "G4VisAttributes.hh"

#include <iomanip>

G4ThreadLocal G4Allocator<TrackerHit>* TrackerHitAllocator = 0;

TrackerHit::TrackerHit()
    : G4VHit(),
    trackID(-1),
    edep(0.),
    position(vector3())
{}

TrackerHit::~TrackerHit() {}

TrackerHit::TrackerHit(const TrackerHit& right)
    : G4VHit()
{
    trackID = right.trackID;
    edep = right.edep;
    position = right.position;
}

const TrackerHit& TrackerHit::operator=(const TrackerHit& right)
{
    trackID = right.trackID;
    edep = right.edep;
    position = right.position;

    return *this;
}

G4bool TrackerHit::operator==(const TrackerHit& right) const
{
    return (this == &right) ? true : false;
}
