import { Maths, Vector3, Camera } from './maths.js';

export class HTMLManager {
    constructor() {

    }
    static hexToRgb(hex) {
        hex = hex.substr(1);
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;

        return new Vector3(r / 255, g / 255, b / 255);
    }
    static addElement(id, detector_buttons, detector_ids, detectors, selected,copies) {

        let header = document.createElement('div');
        header.id = 'card_header' + id;
        let button = document.createElement('div');
        button.id = 'card_button' + id;
        let collapse = document.createElement('div');
        collapse.id = 'collapse' + id;
        let body = document.createElement('div');
        let card = document.createElement('div');

        card.classList.add("card");
        header.classList.add('card-header');

        button.classList.add('btn');
        button.classList.add('btn-link');
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', '#collapse' + id);
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('aria-controls', 'collapse' + id);
        button.innerHTML = document.getElementById("detectorid").value;
        

        collapse.classList.add('collapse');
        collapse.setAttribute('aria-labelledby', 'card_header' + id);
        collapse.setAttribute('data-parent', '#accordion');

        body.classList.add('card-body');
        body.classList.add('pre-scrollable');
        body.innerHTML = '<article id="properties' + id + '">' +
            'position: <br>' +
            '<div class="d-flex p-2">' +
            'x: <input class="prop-field" type="number" value="' + document.getElementById("detectorx").value + '" id="detectorx' + id + '">' +
            'y: <input class="prop-field" type="number" value="' + document.getElementById("detectory").value + '" id="detectory' + id + '">' +
            'z: <input class="prop-field" type="number" value="' + document.getElementById("detectorz").value + '" id="detectorz' + id + '"> <br>' +
            '</div>' +

            'rotation: <br>' +
            '<div class="d-flex p-2">' +
            'x: <input class="prop-field" type="number" value="' + document.getElementById("rotx").value + '" id="rotx' + id + '">' +
            'y: <input class="prop-field" type="number" value="' + document.getElementById("roty").value + '" id="roty' + id + '">' +
            'z: <input class="prop-field" type="number" value="' + document.getElementById("rotz").value + '" id="rotz' + id + '"><br>' +
            "</div>" +
            'scale: <br>' +
            '<div class="d-flex p-2">' +
            'x: <input class="prop-field" type="number" value="' + document.getElementById("scalex").value + '" id="scalex' + id + '">' +
            'y: <input class="prop-field" type="number" value="' + document.getElementById("scaley").value + '" id="scaley' + id + '">' +
            'z: <input class="prop-field" type="number" value="' + document.getElementById("scalez").value + '" id="scalez' + id + '"><br>' +
            '</div>' +


            'material: <br>' +

            '<select id="materials' + id + '">' +
            '<option value="G4_Pb" selected>Lead</option>' +
            '<option value="G4_Fe">Iron</option>' +
            '<option value="G4_Na">Sodium</option>' +
            '<option value="G4_H">Hidrogen</option>' +
            '<option value="G4_He">Helium</option>' +
            '<option value="G4_Li">Litium</option>' +
            '<option value="G4_Si">Silicon</option>' +
            '<option value="G4_Mn">Manganese</option>' +
            '<option value="G4_Cs">Caesium</option>' +
            '<option value="G4_Au">Gold</option>' +
            '<option value="G4_Be">Berillium</option>' +
            '</select><br>' +
            '<p id="dep' + id + '">EnergyDeposited: </p>' +
            'Color: <br>' +
            '<input type="color" id="color' + id + '"></input><br>' +
            '<button id="delete' + id + '">Delete</button>' +
            '</article>';

        header.appendChild(button);
        collapse.appendChild(body);

        card.appendChild(header);
        card.appendChild(collapse);

        document.getElementById("accordion").appendChild(card);

        detector_buttons.push(button);
        document.getElementById('card_button' + id).addEventListener('click', function () {
            selected = -1;
            for (var i = 0; i < detector_buttons.length; i++) {
                if (button == detector_buttons[i]) {
                    selected = i;
                }
            }
            for(var i = 0;i<copies.length;i++){
                if(i == selected) continue;
                copies[i].active = false;
            }
            copies[selected].active = !copies[selected].active;
        });

        document.getElementById('delete' + id).addEventListener('click', function(){
            detectors.splice(copies.indexOf(copies[selected]), 1);
            detector_buttons.splice(copies.indexOf(copies[selected]), 1);
            detector_ids.splice(copies.indexOf(copies[selected]), 1);
            copies.splice(copies.indexOf(copies[selected]), 1);

            body.remove();
            card.remove();
        });

        var cl = document.getElementById('color' + id);
        cl.addEventListener('input', function () {
            var m = -1;
            for (var j = 0; j < detector_ids.length; j++) {
                if (detector_ids[j] == selected) m = j;
            }
            detectors[m].model.color = HTMLManager.hexToRgb(cl.value);
        });
        document.getElementById("detectorx" + id).addEventListener("change", function(){
            copies[selected].model.position.x = document.getElementById("detectorx" + id).value;
        });
        document.getElementById("detectory" + id).addEventListener("change", function(){
            copies[selected].model.position.y = document.getElementById("detectory" + id).value;
        });
        document.getElementById("detectorz" + id).addEventListener("change", function(){
            copies[selected].model.position.z = document.getElementById("detectorz" + id).value;
        });
        document.getElementById("rotx" + id).addEventListener("change", function(){
            copies[selected].model.rotation.x = document.getElementById("rotx" + id).value / (180.0 / Math.PI);;
        });
        document.getElementById("roty" + id).addEventListener("change", function(){
            copies[selected].model.rotation.y = document.getElementById("roty" + id).value / (180.0 / Math.PI);;
        });
        document.getElementById("rotz" + id).addEventListener("change", function(){
            copies[selected].model.rotation.z = document.getElementById("rotz" + id).value / (180.0 / Math.PI);;
        });
        document.getElementById("scalex" + id).addEventListener("change", function(){
            copies[selected].model.scale.x = document.getElementById("scalex" + id).value;
        });
        document.getElementById("scaley" + id).addEventListener("change", function(){
            copies[selected].model.scale.y = document.getElementById("scaley" + id).value;
        });
        document.getElementById("scalez" + id).addEventListener("change", function(){
            copies[selected].model.scale.z = document.getElementById("scalez" + id).value;
        });
        //detectors[i].material = document.getElementById("materials" + parseFloat(detector_ids[i])).options[document.getElementById("materials" + parseFloat(detector_ids[i])).selectedIndex].value;
        document.getElementById("materials" + id).addEventListener("change", function(){
            copies[selected].material = document.getElementById("materials" + id).options[document.getElementById("materials" + id).selectedIndex].value
        });

        

        copies[copies.length-1].model.position.x = document.getElementById("detectorx" + id).value;
        copies[copies.length-1].model.position.y = document.getElementById("detectory" + id).value;
        copies[copies.length-1].model.position.z = document.getElementById("detectorz" + id).value;

        copies[copies.length-1].model.rotation.x = document.getElementById("rotx" + id).value / (180.0 / Math.PI);;
        copies[copies.length-1].model.rotation.y = document.getElementById("roty" + id).value / (180.0 / Math.PI);;
        copies[copies.length-1].model.rotation.z = document.getElementById("rotz" + id).value / (180.0 / Math.PI);;

        copies[copies.length-1].model.scale.x = document.getElementById("scalex" + id).value;
        copies[copies.length-1].model.scale.y = document.getElementById("scaley" + id).value;
        copies[copies.length-1].model.scale.z = document.getElementById("scalez" + id).value;
        
        copies[copies.length-1].material = document.getElementById("materials" + id).options[document.getElementById("materials" + id).selectedIndex].value

        copies[copies.length-1].name = document.getElementById("detectorid").value;

    }
    static addGunElement(id, guns, detector_ids, selected, detector_buttons,copies){
        let header = document.createElement('div');
        header.id = 'card_header' + id;
        let button = document.createElement('div');
        button.id = 'card_button' + id;
        let collapse = document.createElement('div');
        collapse.id = 'collapse' + id;
        let body = document.createElement('div');
        let card = document.createElement('div');

        card.classList.add("card");
        header.classList.add('card-header');

        button.classList.add('btn');
        button.classList.add('btn-link');
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', '#collapse' + id);
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('aria-controls', 'collapse' + id);

        button.innerHTML = document.getElementById("gunid").value;

        collapse.classList.add('collapse');
        collapse.setAttribute('aria-labelledby', 'card_header' + id);
        collapse.setAttribute('data-parent', '#accordion');

        body.classList.add('card-body');
        body.classList.add('pre-scrollable');
        body.innerHTML = '<article id="properties' + id + '">' +
            'position: <br>' +
            '<div class="d-flex p-2">' +
            'x: <input class="prop-field" type="number" value="' + document.getElementById("gunx").value + '" id="gunx' + id + '">' +
            'y: <input class="prop-field" type="number" value="' + document.getElementById("guny").value + '" id="guny' + id + '">' +
            'z: <input class="prop-field" type="number" value="' + document.getElementById("gunz").value + '" id="gunz' + id + '"> <br>' +
            '</div><br>' +

            '<div class="d-flex p-2">' +
            'x: <input class="prop-field" type="number" value="' + document.getElementById("dirx").value + '" id="dirx' + id + '">' +
            'y: <input class="prop-field" type="number" value="' + document.getElementById("diry").value + '" id="diry' + id + '">' +
            'z: <input class="prop-field" type="number" value="' + document.getElementById("dirz").value + '" id="dirz' + id + '"> <br>' +
            '</div>' +

            'energy: <br>' +

            '<input type="text" value="' + document.getElementById("gunenergy").value + '" id="gunenergy' + id + '"></input>'
             +
            '<p id="dep' + id + '">EnergyDeposited: </p>' +
            'Color: <br>' +
            '<input type="color" id="color' + id + '"></input><br>' +
            '<button id="delete' + id + '">Delete</button>' +
            '</article>';


        header.appendChild(button);
        collapse.appendChild(body);

        card.appendChild(header);
        card.appendChild(collapse);

        document.getElementById("accordion").appendChild(card);

        detector_buttons.push(button);

        document.getElementById('delete' + id).addEventListener('click', function(){
            copies.splice(detector_ids[id], 1);
            guns.splice(detector_ids[id], 1);
            detector_buttons.splice(detector_ids[id], 1);
            detector_ids.splice(detector_ids[id], 1);
            body.remove();
            card.remove();
        });

        document.getElementById('card_button' + id).addEventListener('click', function () {
            selected = -1;
            for (var i = 0; i < detector_buttons.length; i++) {
                if (button == detector_buttons[i]) {
                    selected = i;
                }
            }
        });

        var cl = document.getElementById('color' + id);
        cl.addEventListener('input', function () {
            var m = -1;
            for (var j = 0; j < detector_ids.length; j++) {
                if (detector_ids[j] == selected) m = j;
            }
            guns[m].model.color = HTMLManager.hexToRgb(cl.value);
        });
        document.getElementById("gunenergy" + id).addEventListener("change", function(e){
            copies[detector_ids[selected]].energy = document.getElementById("gunenergy" + id).value;
        });
        document.getElementById("gunx" + id).addEventListener("change", function(e){
            copies[detector_ids[selected]].model.position.x = document.getElementById("gunx" + id).value;
        });
        document.getElementById("guny" + id).addEventListener("change", function(e){
            copies[detector_ids[selected]].model.position.y = document.getElementById("guny" + id).value;
        });
        document.getElementById("gunz" + id).addEventListener("change", function(e){
            copies[detector_ids[selected]].model.position.z = document.getElementById("gunz" + id).value;
        });
        document.getElementById("dirx" + id).addEventListener("change", function(e){
            copies[detector_ids[selected]].model.rotation.x = document.getElementById("dirx" + id).value / 57.32;
        });
        document.getElementById("diry" + id).addEventListener("change", function(e){
            copies[detector_ids[selected]].model.rotation.y = document.getElementById("diry" + id).value/ 57.32;
        });
        document.getElementById("dirz" + id).addEventListener("change", function(e){
            copies[detector_ids[selected]].model.rotation.z = document.getElementById("dirz" + id).value/ 57.32;
        });
    }
    static addGPSElement(id, sources, detector_ids, selected, detector_buttons,copies){
        let header = document.createElement('div');
        header.id = 'card_header' + id;
        let button = document.createElement('div');
        button.id = 'card_button' + id;
        let collapse = document.createElement('div');
        collapse.id = 'collapse' + id;
        let body = document.createElement('div');
        let card = document.createElement('div');

        card.classList.add("card");
        header.classList.add('card-header');

        button.classList.add('btn');
        button.classList.add('btn-link');
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', '#collapse' + id);
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('aria-controls', 'collapse' + id);

        button.innerHTML = document.getElementById("gpsid").value;

        collapse.classList.add('collapse');
        collapse.setAttribute('aria-labelledby', 'card_header' + id);
        collapse.setAttribute('data-parent', '#accordion');

        body.classList.add('card-body');
        body.classList.add('pre-scrollable');
        body.innerHTML = '<article id="properties' + id + '">' +
            'position: <br>' +
            '<div class="d-flex p-2">' +
            'x: <input class="prop-field" type="number" value="' + document.getElementById("gpsx").value + '" id="gpsx' + id + '">' +
            'y: <input class="prop-field" type="number" value="' + document.getElementById("gpsy").value + '" id="gpsy' + id + '">' +
            'z: <input class="prop-field" type="number" value="' + document.getElementById("gpsz").value + '" id="gpsz' + id + '"> <br>' +
            '</div>' +

            'material: <br>' +

            '<input type="text" value="U235" id="gpsmaterial' + id + '"></input>'
             +
            '<p id="dep' + id + '">EnergyDeposited: </p>' +
            'Color: <br>' +
            '<input type="color" id="color' + id + '"></input><br>' +
            '<button id="delete' + id + '">Delete</button>' +
            '</article>';


        header.appendChild(button);
        collapse.appendChild(body);

        card.appendChild(header);
        card.appendChild(collapse);

        document.getElementById("accordion").appendChild(card);

        detector_buttons.push(button);

        document.getElementById('delete' + id).addEventListener('click', function(){
            copies.splice(detector_ids[id], 1);
            sources.splice(detector_ids[id], 1);
            detector_buttons.splice(detector_ids[id], 1);
            detector_ids.splice(detector_ids[id], 1);
            body.remove();
            card.remove();
        });

        document.getElementById('card_button' + id).addEventListener('click', function () {
            selected = -1;
            for (var i = 0; i < detector_buttons.length; i++) {
                if (button == detector_buttons[i]) {
                    selected = i;
                }
            }
        });

        var cl = document.getElementById('color' + id);
        cl.addEventListener('input', function () {
            var m = -1;
            for (var j = 0; j < detector_ids.length; j++) {
                if (detector_ids[j] == selected) m = j;
            }
            sources[m].model.color = HTMLManager.hexToRgb(cl.value);
        });
        document.getElementById("gpsmaterial" + id).addEventListener("change", function(e){
            copies[detector_ids[selected]].material = document.getElementById("gpsmaterial" + id).value;
            alert(copies[detector_ids[selected]].material);
        });
        document.getElementById("gpsx" + id).addEventListener("change", function(e){
            copies[copies.length-1].model.position.x = document.getElementById("gpsx" + id).value;
        });
        document.getElementById("gpsy" + id).addEventListener("change", function(e){
            copies[copies.length-1].model.position.y = document.getElementById("gpsy" + id).value;
        });
        document.getElementById("gpsz" + id).addEventListener("change", function(e){
            copies[copies.length-1].model.position.z = document.getElementById("gpsz" + id).value;
        });
    }

    static addSTLElement(id, detector_buttons, detector_ids, detectors, selected,copies) {

        let header = document.createElement('div');
        header.id = 'card_header' + id;
        let button = document.createElement('div');
        button.id = 'card_button' + id;
        let collapse = document.createElement('div');
        collapse.id = 'collapse' + id;
        let body = document.createElement('div');
        let card = document.createElement('div');

        card.classList.add("card");
        header.classList.add('card-header');

        button.classList.add('btn');
        button.classList.add('btn-link');
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', '#collapse' + id);
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('aria-controls', 'collapse' + id);
        button.innerHTML = document.getElementById("stldetectorid").value;

        collapse.classList.add('collapse');
        collapse.setAttribute('aria-labelledby', 'card_header' + id);
        collapse.setAttribute('data-parent', '#accordion');

        body.classList.add('card-body');
        body.classList.add('pre-scrollable');
        body.innerHTML = '<article id="properties' + id + '">' +
            'position: <br>' +
            '<div class="d-flex p-2">' +
            'x: <input class="prop-field" type="number" value="' + document.getElementById("stldetectorx").value + '" id="detectorx' + id + '">' +
            'y: <input class="prop-field" type="number" value="' + document.getElementById("stldetectory").value + '" id="detectory' + id + '">' +
            'z: <input class="prop-field" type="number" value="' + document.getElementById("stldetectorz").value + '" id="detectorz' + id + '"> <br>' +
            '</div>' +

            'rotation: <br>' +
            '<div class="d-flex p-2">' +
            'x: <input class="prop-field" type="number" value="' + document.getElementById("stlrotx").value + '" id="rotx' + id + '">' +
            'y: <input class="prop-field" type="number" value="' + document.getElementById("stlroty").value + '" id="roty' + id + '">' +
            'z: <input class="prop-field" type="number" value="' + document.getElementById("stlrotz").value + '" id="rotz' + id + '"><br>' +
            "</div>" +
            'scale: <br>' +
            '<div class="d-flex p-2">' +
            'x: <input class="prop-field" type="number" value="' + document.getElementById("stlscalex").value + '" id="scalex' + id + '">' +
            'y: <input class="prop-field" type="number" value="' + document.getElementById("stlscaley").value + '" id="scaley' + id + '">' +
            'z: <input class="prop-field" type="number" value="' + document.getElementById("stlscalez").value + '" id="scalez' + id + '"><br>' +
            '</div>' +


            'material: <br>' +

            '<select id="materials' + id + '">' +
            '<option value="G4_Pb" selected>Lead</option>' +
            '<option value="G4_Fe">Iron</option>' +
            '<option value="G4_Na">Sodium</option>' +
            '<option value="G4_H">Hidrogen</option>' +
            '<option value="G4_He">Helium</option>' +
            '<option value="G4_Li">Litium</option>' +
            '<option value="G4_Si">Silicon</option>' +
            '<option value="G4_Mn">Manganese</option>' +
            '<option value="G4_Cs">Caesium</option>' +
            '<option value="G4_Au">Gold</option>' +
            '<option value="G4_Be">Berillium</option>' +
            '</select><br>' +
            '<p id="dep' + id + '">EnergyDeposited: </p>' +
            'Color: <br>' +
            '<input type="color" id="color' + id + '"></input><br>' +
            '<button id="delete' + id + '">Delete</button>' +
            '</article>';


        header.appendChild(button);
        collapse.appendChild(body);

        card.appendChild(header);
        card.appendChild(collapse);

        document.getElementById("accordion").appendChild(card);

        detector_buttons.push(button);
        document.getElementById('card_button' + id).addEventListener('click', function () {
            selected = -1;
            for (var i = 0; i < detector_buttons.length; i++) {
                if (button == detector_buttons[i]) {
                    selected = i;
                }
            }
            for(var i = 0;i<copies.length;i++){
                if(i == selected) continue;
                copies[i].active = false;
            }
            copies[selected].active = !copies[selected].active;
        });

        document.getElementById('delete' + id).addEventListener('click', function(){
            copies.splice(detector_ids[id], 1);
            detectors.splice(detector_ids[id], 1);
            detector_buttons.splice(detector_ids[id], 1);
            detector_ids.splice(detector_ids[id], 1);
            body.remove();
            card.remove();
            alert("ad");
        });

        var cl = document.getElementById('color' + id);
        cl.addEventListener('input', function () {
            var m = -1;
            for (var j = 0; j < detector_ids.length; j++) {
                if (detector_ids[j] == selected) m = j;
            }
            detectors[m].model.color = HTMLManager.hexToRgb(cl.value);
        });
        document.getElementById("detectorx" + id).addEventListener("change", function(){
            copies[selected].model.position.x = document.getElementById("detectorx" + id).value;
        });
        document.getElementById("detectorx" + id).addEventListener("change", function(){
            copies[selected].model.position.x = document.getElementById("detectorx" + id).value;
        });
        document.getElementById("detectory" + id).addEventListener("change", function(){
            copies[selected].model.position.y = document.getElementById("detectory" + id).value;
        });
        document.getElementById("detectorz" + id).addEventListener("change", function(){
            copies[selected].model.position.z = document.getElementById("detectorz" + id).value;
        });
        document.getElementById("rotx" + id).addEventListener("change", function(){
            copies[selected].model.rotation.x = document.getElementById("rotx" + id).value / (180.0 / Math.PI);;
        });
        document.getElementById("roty" + id).addEventListener("change", function(){
            copies[selected].model.rotation.y = document.getElementById("roty" + id).value / (180.0 / Math.PI);;
        });
        document.getElementById("rotz" + id).addEventListener("change", function(){
            copies[selected].model.rotation.z = document.getElementById("rotz" + id).value / (180.0 / Math.PI);;
        });
        document.getElementById("scalex" + id).addEventListener("change", function(){
            copies[selected].model.scale.x = document.getElementById("scalex" + id).value;
        });
        document.getElementById("scaley" + id).addEventListener("change", function(){
            copies[selected].model.scale.y = document.getElementById("scaley" + id).value;
        });
        document.getElementById("scalez" + id).addEventListener("change", function(){
            copies[selected].model.scale.z = document.getElementById("scalez" + id).value;
        });
        //detectors[i].material = document.getElementById("materials" + parseFloat(detector_ids[i])).options[document.getElementById("materials" + parseFloat(detector_ids[i])).selectedIndex].value;
        document.getElementById("materials" + id).addEventListener("change", function(){
            copies[selected].material = document.getElementById("materials" + id).options[document.getElementById("materials" + id).selectedIndex].value
        });



        copies[copies.length-1].model.position.x = document.getElementById("detectorx" + id).value;
        copies[copies.length-1].model.position.y = document.getElementById("detectory" + id).value;
        copies[copies.length-1].model.position.z = document.getElementById("detectorz" + id).value;

        copies[copies.length-1].model.rotation.x = document.getElementById("rotx" + id).value / (180.0 / Math.PI);;
        copies[copies.length-1].model.rotation.y = document.getElementById("roty" + id).value / (180.0 / Math.PI);;
        copies[copies.length-1].model.rotation.z = document.getElementById("rotz" + id).value / (180.0 / Math.PI);;

        copies[copies.length-1].model.scale.x = document.getElementById("scalex" + id).value;
        copies[copies.length-1].model.scale.y = document.getElementById("scaley" + id).value;
        copies[copies.length-1].model.scale.z = document.getElementById("scalez" + id).value;
        
        copies[copies.length-1].material = document.getElementById("materials" + id).options[document.getElementById("materials" + id).selectedIndex].value

        copies[copies.length-1].name = document.getElementById("stldetectorid").value;
    }
    static showError() {
        /*<div class="alert alert-danger">
  <strong>Danger!</strong> Indicates a dangerous or potentially negative action.
</div>*/

    }
}

$('#detectorinput').on('change', function () {
    var fileName = $(this).val();
    fileName = fileName.split("\\")[fileName.split("\\").length - 1];
    $(this).next('.custom-file-label').html(fileName);
    let type = fileName.split(".")[fileName.split(".").length - 1];
    if (type == "stl" || type == "STL") {
        let alert = document.getElementById("stldanger");
        alert.classList.remove("alert-danger");
        alert.classList.add("alert-success");
        alert.innerHTML = "<strong>OK!</strong>";
    } else {
        let alert = document.getElementById("stldanger");
        alert.classList.remove("alert-success");
        alert.classList.add("alert-danger");
        alert.innerHTML = "<strong>Invalid Format!</strong>Select an STL model to load!";
    }
});