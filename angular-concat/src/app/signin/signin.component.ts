import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm = {
    email:'',
    password:''
  }

  err_msg:string = '';

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
    console.log(this.signinForm)
  }

  signin(){
    const formData = this.signinForm;
    this.http.post('http://localhost:3000/session',formData).toPromise().then((res:any)=>{
      // console.log(res)
      localStorage.setItem('auth_token',res.token)
      localStorage.setItem('userInfo',JSON.stringify(res.user));
      this.router.navigate(['/'])
    })
    .catch((err)=>{
      // console.log(err)
      if (err.status === 422) {
        this.err_msg = "邮箱或密码格式不正确，请重新输入"
      }
      if (err.status === 401) {
        this.err_msg = "用户名或密码错误"
      }
    })
  }

}
