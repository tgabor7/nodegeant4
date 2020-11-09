import { Vector3 } from "../utils/maths.js";

export class ParticleSource {
    constructor(model, position, material){
        this.position = position;
        this.name = "Particle Source";
        this.scale = new Vector3(1,1,1);
        this.material = material;
        this.model = model;
        this.model.color = new Vector3(0,1,0);
        this.active = false;
        this.id = 0;
        this.units = [1];
    }
}