import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Http, Response, Headers } from '@angular/http';
import { Model } from '../model';
import { empty } from 'rxjs/Observer';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public model=new Model();
  loginObj:object={};
  
  constructor(private router:Router, private user:UserService,private http: Http) { }

  ngOnInit() {
   //this.model.welcome=false;
  }
  
  loginUser=function(e) {
    e.preventDefault();
    console.log(e);
    this.model.uname=e.target.elements[0].value;
    this.model.pwd=e.target.elements[1].value;
    this.loginObj={
      "username": this.model.uname,
      "password":this.model.pwd
    }

    if(this.model.uname=="admin"){
      this.user.setWelcome(this.loginObj.username);
      this.user.setLog(this.model.uname);
      this.router.navigate(['dashboard']);
    }

    this.http.post('http://localhost:3000/display/login', this.loginObj)
        .subscribe((res:Response) =>{
          console.log(res);
          var temp=res['_body'];
          if(temp=='true'){
            console.log(temp);
            //console.log(this.user.getLog());
            //this.user.setLog();
            console.log(this.model.uname);
            this.user.setWelcome(this.loginObj.username);
            this.user.setLog(this.model.uname);
            this.router.navigate(['dashboard']);
            //console.log(this.user.getLog());
          }
          else{
            console.log("Username or Password incorrect. Please try again");
            this.model.errmsg="Username or Password incorrect. Please try again"
          }
        var temp=res['_body'];
          
        
          console.log("id"+temp);
          
         this.model.message="Welcome "+temp;
          this.model.welmsg=true;
          console.log(temp);
          // if(temp=='admin'){
          // this.router.navigate(['dashboard']);
          // }
          // else{
            
          //   this.router.navigate(['graph']);
          // }
          
          
          return res;
        })

    // if(username=='admin' && password=='admin')
    // {
    //   this.model.visible=true;
    //   this.user.setUserLoggedIn();
    //   this.router.navigate(['dashboard']);
      
    // }
  }
  
  // @Output() messageEvent = new EventEmitter<string>();

  // sendMessage(){
  //   this.messageEvent.emit(this.model.message)
  // }
}
