import React, { Component, createRef } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-zoom';

class Spectrum extends Component {
    constructor(props){
        super(props);
        this.canvas = React.createRef();
        
    }
    componentDidMount(){
        this.chart = new Chart(this.canvas.current.getContext("2d"), {
            // The type of chart we want to create
            type: 'bar',
        
            // The data for our dataset
            data: {
                labels: [],
                datasets: [{
                    label: 'counts',
                    backgroundColor: 'rgb(0, 99, 132)',
                    borderColor: 'rgb(0, 99, 132)',
                    data: []
                }]
            },
        
            // Configuration options go here
            options: { responsive: true,
                plugins: {
                    zoom: {
                        // Container for pan options
                        pan: {
                            // Boolean to enable panning
                            enabled: true,
        
                            // Panning directions. Remove the appropriate direction to disable 
                            // Eg. 'y' would only allow panning in the y direction
                            mode: 'xy'
                        },
        
                        // Container for zoom options
                        zoom: {
                            // Boolean to enable zooming
                            enabled: true,
        
                            // Zooming directions. Remove the appropriate direction to disable 
                            // Eg. 'y' would only allow zooming in the y direction
                            mode: 'xy',
                        }
                    }
                }
             }
        });
    }
    render(){
        return <div>
            <canvas ref={this.canvas}></canvas>
        </div>
    }
    energies = [];
    numberofenergies = [];
    add(e){
        if(isNaN(e)) return;
        if(this.contains(e)){
            this.numberofenergies[this.getIndex(e)]++;
        }else{
            this.energies.push(e);
            this.numberofenergies.push(1);
        }
    }
    contains(e){
        for(var i = 0;i<this.energies.length;i++){
            if(this.energies[i] == e) return true;
        }
        return false;
    }
    getIndex(e){
        for(var i = 0;i<this.energies.length;i++){
            if(Math.abs(this.energies[i] - e) == 0) return i;
        }
        return -1;
    }
    sort(){
        var list = [];
        for (var j = 0; j < this.energies.length; j++)
            list.push({ 'hit': this.energies[j], 'no': this.numberofenergies[j] });

        list.sort(function (a, b) {
            return ((a.hit < b.hit) ? -1 : ((a.hit == b.hit) ? 0 : 1));
        });
        
        for (var k = 0; k < list.length; k++) {
            this.energies[k] = list[k].hit;
            this.numberofenergies[k] = list[k].no;
        }
        for(var i = 0;i<this.energies.length;i++){
            this.addData(this.energies[i],this.numberofenergies[i]);
        }
    }
    clear(){
        this.chart.destroy();
        let ctx = this.canvas.current.getContext("2d");
        this.chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
        
            // The data for our dataset
            data: {
                labels: [],
                datasets: [{
                    label: 'counts',
                    backgroundColor: 'rgb(0, 99, 132)',
                    borderColor: 'rgb(0, 99, 132)',
                    data: []
                }]
            },
        
            // Configuration options go here
            options: { responsive: true,
                plugins: {
                    zoom: {
                        // Container for pan options
                        pan: {
                            // Boolean to enable panning
                            enabled: true,
        
                            // Panning directions. Remove the appropriate direction to disable 
                            // Eg. 'y' would only allow panning in the y direction
                            mode: 'xy'
                        },
        
                        // Container for zoom options
                        zoom: {
                            // Boolean to enable zooming
                            enabled: true,
        
                            // Zooming directions. Remove the appropriate direction to disable 
                            // Eg. 'y' would only allow zooming in the y direction
                            mode: 'xy',
                        }
                    }
                }
             }
        });
        this.energies = [];
        this.numberofenergies = [];
        
    }
    static save(){
        
    }
    addData(label, data) {
        this.chart.data.labels.push(label);
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        this.chart.update();
    }
}
export default Spectrum;