import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { DataService } from '../data.service';
import { BaseChartDirective } from "ng2-charts/ng2-charts";

@Component({
  selector: 'app-admin-connection-list',
  templateUrl: './admin-connection-list.component.html',
  styleUrls: ['./admin-connection-list.component.css']
})
export class AdminConnectionListComponent implements OnInit {

  connList = [];
  latitude: number;
  longitude: number;
  realTimeData = [];
  chartData = [];
  chartLabels = [];

  constructor(private http: Http, private dataService: DataService) { }

  showGraph = function (loc) {
    console.log(loc);
    for (let i = 0; i < this.connList.length; i++) {
      if (loc == this.connList[i].locationname) {
        this.latitude = parseFloat(this.connList[i].latitude);
        this.longitude = parseFloat(this.connList[i].longitude);
      }
    }
    this.showMap = true;
    console.log(this.latitude + " " + this.longitude);
  }

  getData = function (dId) {
    console.log(dId);

    this.locObj={
      location:dId
    }

    this.http.post("http://localhost:3000/real-time-data",this.locObj).subscribe(res => {
      console.log(res);
    })

    this.sub = this.dataService.getDeviceData()
      .subscribe(quote => {
        console.log(quote);
        this.chartLabels.push(quote.time);
        this.realTimeData.push(quote.usage);
        console.log(quote.time);
        console.log(this.realTimeData);
        this.chartData = [{ data: this.realTimeData, label: dId }];

        if (this.realTimeData.length == 10 || this.realTimeData.length > 10) {
          this.realTimeData.splice(0,1);
          this.chartLabels.splice(0,1);
        }
      })
  }

  ngOnInit() {

    this.http.get("http://localhost:3000/display/adminlist").subscribe(res => {

      console.log(res);
      var temp = res.json();
      console.log(temp.docs);
      this.connList = temp.docs;
      console.log(this.connList);
    });
  }

}
