import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userInfo:{
    email:string,
    id:number
  } = null
  

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('userInfo');
    if (user) {
      this.userInfo = JSON.parse(user)
    }
  }

  signout(e){
    e.preventDefault();
    this.http.delete('http://localhost:3000/session').toPromise()
    .then((res)=>{
      // console.log(res)
      localStorage.removeItem('auth_token');
      this.router.navigate(['/signin'])

    })
    .catch((err)=>{
       alert("退出失败，请稍后重试！")
    })
  }

}
