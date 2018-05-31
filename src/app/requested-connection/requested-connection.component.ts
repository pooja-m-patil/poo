import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-requested-connection',
  templateUrl: './requested-connection.component.html',
  styleUrls: ['./requested-connection.component.css']
})
export class RequestedConnectionComponent implements OnInit {

  connRequests=[];
  deviceObj:object;
  auth:string;
  hideAddedDevice:any;

  constructor(private http: Http) { 

  }

  addDevice=function(id,classname,description){
    this.deviceObj={
      "id":id,
      "classname":classname,
      "description":description
    }
    
    this.http.post("http://localhost:3000/display/addReq",this.deviceObj).subscribe((res:Response) => 
    {
      console.log(temp);
      var temp=res['_body'];
      console.log(temp);
      this.auth=temp;
      this.hideAddedDevice=id;
      console.log(this.hideAddedDevice);
      for(let i=0;i<this.connRequests.length;i++){
        console.log(this.connRequests[i]._id);
        if(this.hideAddedDevice==this.connRequests[i]._id){
          this.connRequests.splice(i);
        }
      }
    })
  }

  ngOnInit() {
    this.http.get("http://localhost:3000/display/requested_conn").subscribe(res=>{
      console.log(res);
      var temp=res.json();
      console.log(temp);
      console.log(temp.docs);
      this.connRequests=temp.docs;
      console.log(this.hideAddedDevice);
      
      
      console.log(this.connRequests);
  })

}
}