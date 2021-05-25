import {Maths, Vector3,Vector4} from './Maths.js';

class Ray {
    constructor(o, d){
        this.origin = o;
        this.direction = d;
    }
}

class MousePicker {
    constructor(){
    }
    static d = Infinity;
    static check(detectors,sources,guns, ray,camera){
        this.d = Infinity;
        var res = -1;
        for(var i = 0;i<detectors.length;i++){
            let mat = Maths.createTransformationMatrix(detectors[i].model.position.x, detectors[i].model.position.y, detectors[i].model.position.z,
                detectors[i].model.rotation.x, detectors[i].model.rotation.y, detectors[i].model.rotation.z, detectors[i].model.scale.x,
                 detectors[i].model.scale.y,
                detectors[i].model.scale.z);
            if(this.checkModel(ray, detectors[i].model.vertices, mat)){
                res = detectors[i].id;
            }
        }
        this.d = Infinity;
        for(var i = 0;i<guns.length;i++){
            let rotation = new Vector3(0,0,0);
            rotation.x = Math.atan2(-guns[i].direction.y, guns[i].direction.z);
            rotation.z = Math.atan2(guns[i].direction.x, -guns[i].direction.y);
            rotation.y = Math.atan2(guns[i].direction.x, guns[i].direction.z);

            let mat = Maths.createTransformationMatrix(guns[i].model.position.x, guns[i].model.position.y, guns[i].model.position.z,
                rotation.x, rotation.y, rotation.z, camera.d*0.01,camera.d*0.01,camera.d*0.01);
            
                if(this.checkModel(ray, guns[i].model.vertices, mat)){
                res = guns[i].id;
            }
        }
        this.d = Infinity;
        for(var i = 0;i<sources.length;i++){
            let mat = Maths.createTransformationMatrix(sources[i].model.position.x, sources[i].model.position.y, sources[i].model.position.z,
                sources[i].model.rotation.x, sources[i].model.rotation.y, sources[i].model.rotation.z, camera.d*0.004,camera.d*0.004,camera.d*0.004);
            if(this.checkModel(ray, sources[i].model.vertices, mat)){
                res = sources[i].id;
            }
        }

        return res;
    }
    static checkModel(ray, vertices, transformation){
        var res = false;
        for(var i = 0;i<vertices.length;i+=9){
            var v0, v1, v2;
            v0 = Maths.mulMatV(transformation, new Vector4(vertices[i],vertices[i+1],vertices[i+2],1));
            v1 = Maths.mulMatV(transformation, new Vector4(vertices[i+3],vertices[i+4],vertices[i+5],1));
            v2 = Maths.mulMatV(transformation, new Vector4(vertices[i+6],vertices[i+7],vertices[i+8],1));
            
            if(this.triangleHit(ray, v0.xyz(), v1.xyz(), v2.xyz())){
                res = true;
            }

        }
        return res;
    }
    static triangleHit(ray, v0,v1,v2){
        var e0 = Maths.sub(v1, v0);
        var e1 = Maths.sub(v2, v0);

        var p = Maths.cross(ray.direction, e1);
        var det = Maths.dot(e0, p);
        
        if(det < 0.00001){
            return false;
        }
        var inv_det = 1.0 / det;
        var t = Maths.sub(ray.origin, v0);
        var u = Maths.dot(t, p) * inv_det;

        
        if(u < 0.0 || u > 1.0){
            return false;
        }
        var q = Maths.cross(t,e0);
        var v = Maths.dot(ray.direction, q) * inv_det;
        if(v < 0.0 || v + u > 1.0){
            return false;
        }
        t = Maths.dot(e1,q) * inv_det;
        if(t > 0 && t < this.d){
            this.d = t;
            return true;
        } 
        return false;
    }
    static cameraRay(cam, projection, x, y){
        var ray = new Ray();
        var invview = Maths.invert(Maths.createViewMatrix(cam));
        var origin = Maths.mulMatV(invview, new Vector4(0,0,0,1)).xyz();
        var invproj = Maths.invert(projection);
        var direction = Maths.mulMatV(invproj, new Vector4(x,y,0,1)).xyz();

        direction = Maths.mulMatV(invview, new Vector4(direction.x,direction.y,direction.z,0.0)).xyz();
        direction = Maths.normalize(direction);

        ray.direction = direction;
        ray.origin = origin;

        return ray;
    }
}

export default MousePicker;