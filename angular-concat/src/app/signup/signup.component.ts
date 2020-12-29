import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = {
    email:'',
    password:''
  }

  err_msg:string='';

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  signup(){
    console.log(this.http)
    const formData = this.signupForm;
    /* HttpclientModule 报错时 需要在tsconfig.json 中添加*/
    this.http.post('http://localhost:3000/users',formData).toPromise().then((res:any)=>{
      // console.log(res)
      localStorage.setItem('auth_token',res.token)
      localStorage.setItem("userInfo",JSON.stringify(res.user))
      this.router.navigate(['/'])
    })
    .catch((err)=>{
      // console.log(err)
      if (err.status===409){
        this.err_msg = '邮箱已被占用'
      }
    })
  }

}
