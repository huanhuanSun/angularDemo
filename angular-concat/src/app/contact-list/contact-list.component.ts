import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { VirtualTimeScheduler } from 'rxjs';

interface tagList{
  id:number,
  title:string,
  userId?:number
}

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public contactList:any=[];
  constructor(
    private router:Router,
    private http:HttpClient
  ) { }

  

  ngOnInit(): void {
    // 这里的判断放在路由守卫中 ，这样就不用每个页面都去判断了
    // const user = localStorage.getItem('auth_token');
    // if (!user) {
    //   this.router.navigate(['/signin'])
    // }

    this.getContactList()
  }

  getContactList(){
    //需要在请求中加入 X-Access-Token 认证，为了避免每次请求都加， 故加在请求拦截器中  global.interceptor.ts
    this.http.get('http://localhost:3000/contacts').toPromise()
    .then((res:any)=>{
      console.log(res)
      if (res.length > 0) {
        this.contactList = res
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  deleteContact(id,e){
    console.log(id)
    e.preventDefault();
    this.http.delete(`http://localhost:3000/contacts/${id}`).toPromise()
    .then((res)=>{
      // console.log(res)
      this.getContactList()

    })
    .catch((err)=>{
      console.log(err)
      alert("删除联系人失败！")
    })
  }

}
