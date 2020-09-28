#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "Simulation.hh"



int index = 0;
float nextFloat(std::vector<std::string> data)
{
	float f = std::stof(data[index]);
	index++;

	return f;
}
std::string nextString(std::vector<std::string> data)
{
	std::string s = data[index];
	index++;

	return s;
}
std::vector<std::string> split(std::string s, char c)
{
	std::vector<std::string> result;
	std::string tmp;

	for (int i = 0; i < s.length() - 1; i++) {
		if (s[i] != c) tmp += s[i];
		if (s[i] == c) {
			result.push_back(tmp);
			tmp = "";
		}
	}

	return result;
}
int main(int argc, char** argv)
{
	std::stringstream messagefile;
	messagefile << "message";
	messagefile << argv[1];
	std::ofstream out(messagefile.str());
	std::stringstream debugfile;
	debugfile << "debug";
	debugfile << argv[1];
	debugfile << ".txt";
	std::ofstream debug(debugfile.str());
	std::stringstream receivefile;
	receivefile << "receive";
	receivefile << argv[1];

	std::ifstream mess(receivefile.str());

	std::string str((std::istreambuf_iterator<char>(mess)),
		std::istreambuf_iterator<char>());

	std::string argument;

	for (int i = 1; i < argc; i++) {
		argument.append(argv[i]);
	}
	//out << argument;

	argument = str;
	mess.close();

	std::vector<std::string> floats = split(argument, ',');

	Simulation* sim = new Simulation;

	std::vector<Geometry*> geometries;

	int option = nextFloat(floats);

	Gun* gun = new Gun;

	//forrás
	int number_of_particles = nextFloat(floats);

	gun->position.x = nextFloat(floats) * 10;
	gun->position.y = nextFloat(floats) * 10;
	gun->position.z = nextFloat(floats) * 10;

	gun->direction.x = nextFloat(floats);
	gun->direction.y = nextFloat(floats);
	gun->direction.z = nextFloat(floats);

	gun->energy = nextFloat(floats);

	int number_of_detectors = nextFloat(floats);

	std::cout << "\nNumber of Detectors" << number_of_detectors << "\n";

	//detektorok
	for (int i = 0; i < number_of_detectors; i++) {
		Geometry* tmp = new Geometry;
		tmp->material = nextString(floats);
		std::cout << "\n" << tmp->material << "\n";
		tmp->id = nextFloat(floats);
		std::cout << "\n" << tmp->id << "\n";
		tmp->position.x = nextFloat(floats);
		tmp->position.y = nextFloat(floats);
		tmp->position.z = nextFloat(floats);

		tmp->rotation.x = nextFloat(floats);
		tmp->rotation.y = nextFloat(floats);
		tmp->rotation.z = nextFloat(floats);

		tmp->scale.x = nextFloat(floats);
		tmp->scale.y = nextFloat(floats);
		tmp->scale.z = nextFloat(floats);
		std::cout << "\n" << tmp->scale.z << "\n";
		int number_of_vertices = nextFloat(floats);

		std::cout << "Number of Vertices" << number_of_vertices << "\n";
		for (int j = 0; j < number_of_vertices; j++) {
			float v = nextFloat(floats);
			tmp->vertices.push_back(v);
		}
		sim->addDetector(tmp);
	}

	int number_of_sources = nextFloat(floats);
	for (int i = 0; i < number_of_sources; i++) {
		ParticleSource* source = new ParticleSource(vector3(nextFloat(floats) * 10, nextFloat(floats) * 10, nextFloat(floats) * 10), nextString(floats));
		debug << source->position.x;
		debug << source->position.y;
		debug << source->position.z;

		sim->addSource(source);
	}
	int number_of_guns = nextFloat(floats);
	for (int i = 0; i < number_of_guns; i++) {
		Gun* gun = new Gun;
		gun->position = vector3(nextFloat(floats) * 10, nextFloat(floats) * 10, nextFloat(floats) * 10);
		gun->direction = vector3(nextFloat(floats), nextFloat(floats), nextFloat(floats));
		gun->energy = nextFloat(floats);
		sim->addGun(gun);
	}
	debug << "\n\n\n Number of guns: " << sim->guns.size() << "\n\n\n";

	int spectrum_detector = 0;
	int numberOfParticles = 0;
	if (!option) spectrum_detector = nextFloat(floats);
	numberOfParticles = nextFloat(floats);
	debug << "\n" << numberOfParticles << "\n";

	//sim->addDetector(geo);

	std::stringstream result;
	if (option)result = sim->run(gun, numberOfParticles);
	else result = sim->getSpectrum(gun, numberOfParticles, spectrum_detector);

	out << result.str();

	debug << "\n" << argument;

	out.close();
	debug.close();
	
	delete sim;
	return 0;
}