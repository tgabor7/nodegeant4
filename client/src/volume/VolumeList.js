class VolumeList {
    static init(codeeditor){
        VolumeList.editor = codeeditor;
    }
    static checkVolumeName(name){
        for(let i = 0;i<VolumeList.volumes.length;i++){
            if(VolumeList.volumes[i].name == name){
                return false;
            }
        }
        return true;
    }
    static addVolume(v){
        if(VolumeList.checkVolumeName(v.name)) VolumeList.volumes.push(v);
    }
    static removeAll(){
        VolumeList.volumes = [];
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
        alert("Volume not found!\n" + n);
    }
    static updateVolume(name, newname, newdata, detectors){
        let v = VolumeList.getVolume(name);
        v.name = newname;
        detectors.forEach(e => {
            if(e.geometry == name) e.geometry = newname;
        });
        if(newdata != undefined && newdata.length > 0) v.data = newdata;
        VolumeList.editor.renameGeometry(name, newname, detectors);

    }
    static editor = null;
    static volumes = [];
} 

export default VolumeList;