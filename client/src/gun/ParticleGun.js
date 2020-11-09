export class ParticleGun {
    constructor(model, position, direction, energy){
        this.position = position;
        this.direction = direction;
        this.energy = energy;
        this.model = model;
        this.name = "Particle Gun";
        this.units = [1,1];
    }
}