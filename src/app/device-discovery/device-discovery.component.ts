import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { Quote } from '@angular/compiler';

@Component({
  selector: 'app-device-discovery',
  templateUrl: './device-discovery.component.html',
  styleUrls: ['./device-discovery.component.css']
})
export class DeviceDiscoveryComponent implements OnInit {

  wsdata=[];
  remoteDevices=[];
  sub: Subscription;
  isAdded:boolean=false;
  temp:any
  obj:object;
  flag:number;
  interval: any;
  msg:string;
  showdiv:boolean=false;
  

  constructor(private http:Http,private dataService: DataService,private user:UserService) {
    this.remoteDevices=[];
    
   }

  discdevice=function(id){
    console.log("hello");
    this.productObj={
    "devicename":id
    }
    console.log(id);
    this.http.post("http://localhost:3000/display/add",this.productObj).subscribe((res:Response) => {
    
    console.log(res);
    this.temp=res['_body'];
    console.log(this.temp);
    this.isAdded=true;
    this.obj={
      "added":this.temp,
      "id":id
    }
     this.http.post("http://localhost:3000/remoteApp",this.obj).subscribe((res:Response) => {
      // for(let i=0;i<this.stockQuote.length;i++){
      //   if(id==this.stockQuote[i]){
      //     for(let j=i;j<this.stockQuote.length;j++){
      //       this.stockQuote[i]=this.stockQuote[i+1];
      //     }
      //   }
      // }
      // for(let i=0;i<this.stockQuote.length;i++){
      //   if(id==this.stockQuote[i]){
      //     for(let j=i;j<this.stockQuote.length-1;j++){
      //            this.stockQuote[j]=this.stockQuote[j+1];
      //            this.stockQuote[j+1]="";
      //       }
      //   }
      // }
     
    })
     })
    
  }

  getDevices=function(){

    if(this.remoteDevices.length==0){
      console.log("no dev");
      this.msg="No devices available";
      this.remoteDevices=[];
    }
    
    this.sub = this.dataService.getQuotes()
    .subscribe(quote => {
      console.log(quote);
      this.flag=0;
      this.showdiv=true;
  
    })
      console.log(this.remoteDevices);
  }

  ngOnInit() {
   
  if(this.remoteDevices.length==0){
    console.log("no dev");
    this.msg="No devices available";
  }
  
  this.sub = this.dataService.getQuotes()
  .subscribe(quote => {
    console.log(quote);
    this.flag=0;
    this.showdiv=true;
   this.remoteDevices=quote.slice(0);
  })
    console.log(this.remoteDevices);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.user.resetCount();
    //this.sub.unsubscribe();
  }

}