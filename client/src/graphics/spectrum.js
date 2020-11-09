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
    maximum(l, bin){
        if(l.length == 0) return 0;
        let m = l[0];
        for(let i = 0;i<l.length;i++){
            if(l[i] > m) m = l[i];
        }
        return m;
    }
    sort(bin){
        var list = [];
        let max = this.maximum(this.energies);
        alert(bin);
        for(let i = 0;i<max+2*bin;i+=parseInt(bin)){
            this.add(i);
        }
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
            this.addData(parseInt(this.energies[i]),this.numberofenergies[i]-1);
        }
        this.chart.update();
        
    }
    clear(bin){
        this.energies = [];
        this.numberofenergies = [];
        this.chart.data.labels = [];
        this.chart.data.datasets = [];
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
                
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            fontSize: 18,
                            fontColor: '#000',
                            labelString: 'Number of hits'
                        }
                    }],
                    xAxes: [{
                        // ticks: {
                        //     userCallback: function(label, index, labels) {
                        //         if(parseInt(label) % bin == 0) return label;
                        //         return "";
                        //     }
                        //  },
                        scaleLabel: {
                            display: true,
                            fontSize: 18,
                            fontColor: '#000',
                            labelString: 'Energies (keV)'
                        }
                    }]
                },
                plugins: {
                    zoom: {
                        // Container for pan options
                        pan: {
                            // Boolean to enable panning
                            enabled: true,
        
                            // Panning directions. Remove the appropriate direction to disable 
                            // Eg. 'y' would only allow panning in the y direction
                            mode: 'x'
                        },
        
                        // Container for zoom options
                        zoom: {
                            // Boolean to enable zooming
                            enabled: true,
        
                            // Zooming directions. Remove the appropriate direction to disable 
                            // Eg. 'y' would only allow zooming in the y direction
                            mode: 'x',
                        }
                    }
                }
             }
        });
       
        
    }
    static save(){
        
    }
    addData(label, data) {
        this.chart.data.labels.push(label);
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
    }
}
export default Spectrum;