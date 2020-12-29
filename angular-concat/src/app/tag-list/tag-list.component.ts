import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  tagList:any = [];

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getTagList()
  }

  getTagList(){
    this.http.get('http://localhost:3000/tags').toPromise()
    .then((res)=>{
      // console.log(res);
      this.tagList = res;
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  deleteTag(id,e){
    e.preventDefault();
    this.http.delete(`http://localhost:3000/tags/${id}`).toPromise()
    .then((res)=>{
      // console.log(res)
      this.getTagList()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

}
