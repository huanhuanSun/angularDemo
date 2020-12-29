import { HttpClient } from '@angular/common/http';
import { HtmlAstPath } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-new',
  templateUrl: './tag-new.component.html',
  styleUrls: ['./tag-new.component.css']
})
export class TagNewComponent implements OnInit {
  formData = {
    title:''
  }

  constructor(
    private http:HttpClient,
    private router:Router

  ) { }

  ngOnInit(): void {
  }

  addTag(){
    console.log(this.formData)
    this.http.post('http://localhost:3000/tags', this.formData).toPromise()
    .then((res)=>{
      // console.log(res)
      this.router.navigate(['/tags'])
    })
    .catch((err)=>{
      console.log(err)
    })
  }

}
