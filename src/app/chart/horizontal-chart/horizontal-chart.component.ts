import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
@Component({
	selector: 'app-horizontal-chart',
	templateUrl: './horizontal-chart.component.html',
	styleUrls: ['./horizontal-chart.component.css']
})
export class HorizontalChartComponent implements OnInit {
	data = [{
							"name": "Apples",
							"value": 20,
					},
						{
							"name": "Bananas",
							"value": 12,
					},
						{
							"name": "Grapes",
							"value": 19,
					},
						{
							"name": "Lemons",
							"value": 5,
					},
						{
							"name": "Limes",
							"value": 16,
					},
						{
							"name": "Oranges",
							"value": 26,
					},
						{
							"name": "Pears",
							"value": 30,
					}];
	margin = {
		top: 20,
		right: 20,
		bottom: 30,
		left: 40
	};
	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		if (changes.data) {
			this.updateChart();
		}
	}
	ngOnInit() {
		this.createChart();
	}

	updateChart() {

	}
	createChart() {
		let svg = this.getSvg();
		let x = d3.scaleLinear()
			.domain([0, 100])
			.range([ 0, this.width]);

		let y = d3.scaleBand()
				.range([ 0, this.height ])
				.domain(this.data.map(function(d) { return d['name']; }))
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
		.attr("width", function(d) { return x(d.value); })
		 .attr("y", function(d) { return y(d.name); })
		 .attr("height", y.bandwidth() )
		 .style("fill",this.barColor );
	}

	get barColor() {
		return 'steelblue';
	}

	get width () {
		return 960 - this.margin.left - this.margin.right;
	}

	get height () {
		return 500 - this.margin.top - this.margin.bottom;
	}

	getSvg() {
		return d3.select("#horrizontal-chart").append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
	}
}
