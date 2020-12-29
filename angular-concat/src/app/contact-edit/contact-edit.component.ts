import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  formData={
    name:'',
    email:'',
    phone:'',
    id:0
  }

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    //如何在组件中获取动态路由参数
    const contactId = this.route.snapshot.params.id;
    this.getContactById(contactId)
  }

  getContactById(id){
    this.http.get(`http://localhost:3000/contacts/${id}`).toPromise()
    .then((res:any)=>{
      // console.log(res)
      this.formData = res;
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  editContact(id){
    this.http.patch(`http://localhost:3000/contacts/${id}`,this.formData).toPromise()
    .then((res)=>{
      // console.log(res)
      this.router.navigate(['/contact'])
    })
    .catch((err)=>{
      // console.log(err)
      alert('编辑保存失败！')
    })
  }

}
