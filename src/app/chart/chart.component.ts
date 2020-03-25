import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild('areaChart', {static: true}) chart;
  chartData;
  constructor() { }

  ngOnInit() {
  }

}
