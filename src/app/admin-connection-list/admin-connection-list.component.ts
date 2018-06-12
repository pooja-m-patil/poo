import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-admin-connection-list',
  templateUrl: './admin-connection-list.component.html',
  styleUrls: ['./admin-connection-list.component.css']
})
export class AdminConnectionListComponent implements OnInit {

  connList=[];
  latitude:number;
  longitude:number;

  constructor(private http: Http) { }

  showGraph=function(loc){
    console.log(loc);
    for(let i=0;i<this.connList.length;i++){
      if(loc==this.connList[i].locationname){
        this.latitude=parseFloat(this.connList[i].latitude);
        this.longitude=parseFloat(this.connList[i].longitude);
      }
    }
    this.showMap=true;
    console.log(this.latitude+" "+this.longitude);
  }

  ngOnInit() {

    this.http.get("http://localhost:3000/display/adminlist").subscribe(res=>{

          console.log(res);
          var temp=res.json();
          console.log(temp.docs);
          this.connList=temp.docs;
          console.log(this.connList);
        });
   }

}
