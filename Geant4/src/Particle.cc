#include "Particle.hh"

Track::~Track()
{
	for (int i = 0; i < particles.size(); i++) {
		delete particles[i];
	}
	particles.clear();
}
Particle::~Particle()
{
	next.clear();
}
