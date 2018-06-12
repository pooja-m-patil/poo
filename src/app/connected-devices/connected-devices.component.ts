import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-connected-devices',
  templateUrl: './connected-devices.component.html',
  styleUrls: ['./connected-devices.component.css']
})
export class ConnectedDevicesComponent implements OnInit {

  userNameObj:object;
  location=[];
  latitude:number;
  longitude:number;
  deviceData=[];
  showMap:boolean;

  constructor(private http: Http, private user:UserService) { }


  showGraph=function(loc){
    console.log(loc);
    for(let i=0;i<this.deviceData.length;i++){
      if(loc==this.deviceData[i].locationname){
        this.latitude=parseFloat(this.deviceData[i].latitude);
        this.longitude=parseFloat(this.deviceData[i].longitude);
      }
    }
    this.showMap=true;
    console.log(this.latitude+" "+this.longitude);
  }

  ngOnInit() {

    this.userNameObj={
      "uname":this.user.getWelcome()
    }

    this.http.post('http://localhost:3000/display/confirmed_devices', this.userNameObj)
        .subscribe((res:Response) =>{

          console.log(res);
          var temp=res.json();
          console.log(temp.docs);

          for(let i=0;i<temp.docs.length;i++){
            this.location[i]=temp.docs[i].locationname;
          }
          this.deviceData=temp.docs;

          console.log(this.location);
          console.log(this.deviceData);



        })
  }

}
