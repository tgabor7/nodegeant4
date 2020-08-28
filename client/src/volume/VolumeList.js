class VolumeList {
    static addVolume(v){
        VolumeList.volumes.push(v);
    }
    static removeVolume(v){
        for(let i = 0;i<VolumeList.volumes.length;i++){
            if(v == VolumeList[i]){
                VolumeList.volumes.splice(i, 1);
            }
        }
    }
    static getVolume(n){
        for(let i = 0;i<VolumeList.volumes.length;i++){
            if(VolumeList.volumes[i].name == n) return VolumeList.volumes[i];
        }
    }
    static updateVolume(v){

    }
    static volumes = [];
} 

export default VolumeList;