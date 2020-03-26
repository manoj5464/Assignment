import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
@Component({
	selector: 'app-horizontal-chart',
	templateUrl: './horizontal-chart.component.html',
	styleUrls: ['./horizontal-chart.component.css']
})
export class HorizontalChartComponent implements OnInit {
	data = [{
		Brand:'Coco Cola',
		val_1:4000,
		val_2:2000,
		mark_val:3000
	},{
		Brand:'Fanta',
		val_1:700,
		val_2:900,
		mark_val:800
	},{
		Brand:'Sprite',
		val_1:400,
		val_2:500,
		mark_val:900
	},
	{
		Brand:'Cappy',
		val_1:500,
		val_2:500,
		mark_val:500
	}];
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
		this.createChart();
		//this.createGraph2();
	}

	updateChart() {

	}
	createChart() {
		let svg = this.getSvg();
		let x = d3.scaleLinear()
			.domain([0, 5000])
			.range([ 0, this.width]);

		let y = d3.scaleBand()
				.range([ 0, this.height ])
				.domain(this.data.map(function(d) { return d['Brand']; }))
				.padding(0.1);
		svg.append("g")
			.attr("transform", `translate(0,${this.height})`)
			.call(d3.axisBottom(x))
			.selectAll("text")
			.attr("transform", "translate(0," + this.height + ")")
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

	createGraph2() {
		let svg = this.getSvg();
		let x = d3.scaleLinear()
			.domain([0, 5000])
			.range([ 0, this.width]);

		let y = d3.scaleBand()
				.range([ 0, this.height ])
				.domain(this.data.map(function(d) { return d['Brand']; }))
				.padding(0.1);
		svg.append("g")
			.attr("transform", `translate(0,${this.height})`)
			.call(d3.axisBottom(x))
			.selectAll("text")
			.attr("transform", "translate(0," + this.height + ")")
				.style("text-anchor", "end");

		svg.append("g")
				.call(d3.axisLeft(y));
		 //Bars
		svg.selectAll(".bar")
		 .data(this.data)
		 .enter()
		 .append("rect")
		 .attr("class", "bar")
		//  .attr("x", x(0) )
		.attr("width", function(d) { return x(d['val_2']); })
		 .attr("y", function(d) { return y(d['Brand']); })
		 .attr("height", y.bandwidth() )
		 .style("fill",'#FF0000' );
	}

	get barColor() {
		return 'steelblue';
	}

	get width () {
		return 960 - this.margin.left - this.margin.right;
	}

	get height () {
		return 300 - this.margin.top - this.margin.bottom;
	}

	getSvg() {
		return d3.select("#horrizontal-chart").append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
	}
}
