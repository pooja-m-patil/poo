import { Component,OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from './model';
import { UserService } from './user.service';
import { Http, Response, Headers } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy{
  data:object={};
  arraymsg=[];
  public model=new Model();
  username="codedamn";
  msgObj:object={};
  msg:string;
  showDiv:boolean=false;
  self:boolean=false;
  messages=[];
  userData:string;

  
  stockQuote:number;
  sub: Subscription;

  constructor(private http: Http,private router:Router,private user:UserService) 
  {
   
    this.model.isFetch=false;
  }
 
  changeUsername(ev)
  {
    this.username=ev.target.value;
  }

  graph=function(){
   
    this.router.navigate(['graph']);
  }

  Navigate(value)
  {
    console.log(value);
    if(value=='fetchdata'){
      this.router.navigate(['fetchdata']);
    }
    else if(value=='devicediscovery')
    {
      this.router.navigate(['devicediscovery']);
    }
  }

  adminSelect(val){
    if(val=='logout')
    {
      this.user.logout();
      this.router.navigate(['/']);
    }
    else if(val=='home')
    {
      this.router.navigate(['dashboard']);
    }
  }

  watson=function(e) {
    e.preventDefault();
    console.log(e);
    this.msg=e.target.elements[0].value;
    this.self=true;
    this.pushData();
    this.msgObj={
      "msg":this.msg
    }
    this.userData="";
    this.http.post('http://localhost:3000/display/watson_assistant', this.msgObj)
    .subscribe((res:Response) =>{

      console.log(res);
      this.self=false;
      this.msg=res['_body'];
      this.pushData();
      console.log(this.messages);
      console.log(this.messages[0].text);
    })
  }

  toggleDiv=function(){
    this.showDiv=!this.showDiv;
  }

  pushData=function(){
    this.messages.push({
      "text":this.msg,
      "self":this.self
    })
  }
  

  ngOnInit() {
   this.user.getCount();

   this.http.post('http://localhost:3000/display/welcome_assistant', "")
   .subscribe((res:Response) =>{

     console.log(res);
     this.msg=res['_body'];
     console.log(this.msg);
     this.pushData();
     
   })
  }
  ngOnDestroy() {
   
  }
}



  

  

  
