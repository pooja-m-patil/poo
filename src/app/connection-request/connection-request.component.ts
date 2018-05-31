import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-connection-request',
  templateUrl: './connection-request.component.html',
  styleUrls: ['./connection-request.component.css']
})
export class ConnectionRequestComponent implements OnInit {

  msg:string;

  constructor(private http: Http,private user:UserService) { }


  reqNewDevice=function(product)
  {
    console.log("hello");
    this.productObj={
    "username":this.user.getWelcome(),
    "devicename":product.devicename,
    "classname":product.classname,
    "description":product.description,
    }
    console.log(product.devicename+" "+product.classname+" "+product.description);
    this.http.post("http://localhost:3000/display/reqconn",this.productObj).subscribe((res:Response) => {
    
    console.log(res);
    var temp=res['_body'];
    if(temp=='true'){
      this.msg="Request submited successfully";
    }
    else{
      this.msg="Invalid reuest. Try again";
    }
  })
}
  ngOnInit() {
  }

}
