import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-mapping-devices',
  templateUrl: './mapping-devices.component.html',
  styleUrls: ['./mapping-devices.component.css']
})
export class MappingDevicesComponent implements OnInit {

  iotDevices=[];
  userData=[];
  latitude:number;
  longitude:number;
  value:number;

  constructor(private user:UserService,private http: Http) {
    console.log(this.user.getMapping());
    
   }

   myFunction=function(val){
     console.log("oninput");
     console.log(val);
    let devID = val.split('/')[val.split('/').length-1];
    this.value = devID;
    //console.log(devID);
    }

    connectDevice=function(){
      console.log("connect");
      if(confirm("Are you sure?")) {

      }
    }


  ngOnInit() {

    this.userData=this.user.getMapping();
    console.log(this.userData[0].username);
    this.latitude=parseFloat(this.userData[2].latitude);
    this.longitude=parseFloat(this.userData[3].longitude);
    console.log(this.latitude);
    console.log(this.longitude);
    
    this.http.get("http://localhost:3000/display/getIOTDevices").subscribe((res:Response) => 
      {
        console.log(res.json());
        var temp=res.json();
        console.log(temp.results[0].deviceId);
        // this.iotDevices
        for(let i=0;i<temp.results.length;i++){
          this.iotDevices[i]=temp.results[i].deviceId;
        }
        console.log(this.iotDevices);
      })
  }

}
