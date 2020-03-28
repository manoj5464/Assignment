import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
@Component({
	selector: 'app-horizontal-chart',
	templateUrl: './horizontal-chart.component.html',
	styleUrls: ['./horizontal-chart.component.css']
})
export class HorizontalChartComponent implements OnInit {
	data;
	margin = {
		top: 100,
		right: 20,
		bottom: 10,
		left: 100
	};
	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		if (changes.data) {
			this.updateChart();
		}
	}
	ngOnInit() {
		//this.createGraph2();
		d3.csv('./assets/data/graph_FD.csv')
		.then( (data) => {
			console.log("csv data",data)
			this.data = data;
			this.createChart();
		});
	}

	updateChart() {

	}
	createChart() {
		let svg = this.getSvg();
		let x = d3.scaleLinear()
			.domain([0, 5000])
			.range([ 0, this.width]);

		let y = d3.scaleBand()
				.range([ 0, this.height])
				.domain(this.data.map(function(d) { return d['Brand']; }))
				.padding(0.8);
		svg.append("g")
			.call(d3.axisBottom(x))
			.selectAll("text")
			.attr("transform", "translate(0,-30)")
				.style("text-anchor", "end");

		svg.append("g")
				.call(d3.axisLeft(y));
		
		 //Bars chart one
		svg.selectAll(".bar")
		 .data(this.data)
		 .enter()
		 .append("rect")
		 .attr("class", "bar")
		//  .attr("x", x(0) )
		.attr("width", function(d) { return x(d['val_1']); })
		 .attr("y", function(d) { return y(d['Brand']); })
		 .attr("height", '20px' )
		 .style("fill", function(d) {
			if(d['val_1']>=d['mark_val']) {
				return '#b5b35c';
			} else {
				return '#FF0000';
			}
		 } );

		//second bar chart
		 svg.selectAll()
		 .data(this.data)
		 .enter()
		 .append("rect")
		 .attr("class", "bar")
		.attr("width", function(d) { return x(d['val_2']); })
		 .attr("y", function(d) { return y(d['Brand']); })
		 .attr("height","10px")
		 .style("fill",function(d) {
			if(d['val_1']>=d['mark_val']) {
				return '#32CD32';
			} else {
				return '#FF0000';
			}
		 }  )

		//third bar 
		 
	}

	get barColor() {
		return 'steelblue';
	}

	get width () {
		return 960 - this.margin.left - this.margin.right;
	}

	get height () {
		return 600 - this.margin.top - this.margin.bottom;
	}

	getSvg() {
		return d3.select("#horrizontal-chart").append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
	}
}
