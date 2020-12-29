import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {

  formData={
    name:'',
    email:'',
    phone:''

  }

  err_msg = 'a'

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  addContact(){
    this.http.post('http://localhost:3000/contacts',this.formData).toPromise()
    .then((res)=>{
      // console.log(res)
      this.router.navigate(['/contact'])
    })
    .catch((err)=>{
      // console.log(err)
      alert('新增联系人失败！')
    })
  }

}
