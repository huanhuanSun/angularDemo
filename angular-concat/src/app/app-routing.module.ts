import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes,RouterModule} from '@angular/router'
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagNewComponent } from './tag-new/tag-new.component';
import { TagEditComponent } from './tag-edit/tag-edit.component';
import { RouteGuard } from './routing-guard.service'; // 路由守卫

const routes:Routes = [
  {
    path:'',
    redirectTo:'contact',//当请求根路径时，跳转到contact 联系人组件中
    pathMatch:'full'// 必须完全匹配到路径时 才做重定向
  },
  {
    //当访问contact时，会先把 LayoutComponent 组件渲染出来  然后把children 中 path 为空的路由 渲染到 LayoutComponent 组件中的路由出口
    path:'contact',
    component: LayoutComponent,
    canActivate:[RouteGuard],//路由守卫  如果有token值，就进入contact 页面  否则进入登录界面
    //嵌套路由
    children:[
      {
        path:'',
        component:ContactListComponent,
      },
      {
        path:'new', //这里的 new 请求的路径是 /contact/new
        component:ContactNewComponent
      },
      {
        path:'edit/:id',//动态路由
        component:ContactEditComponent
      }
    ]
  },
  {
    path:'tags',
    component:LayoutComponent,
    canActivate:[RouteGuard],//路由守卫
    children:[
      {
        path:'',
        component:TagListComponent
      },
      {
        path:'new',
        component:TagNewComponent
      },
      {
        path:'edit',
        component:TagEditComponent
      }
    ]
  },
  {
    path:'signin',
    component:SigninComponent
  },
  {
    path:'signup',
    component:SignupComponent
  }
]



@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers:[RouteGuard] //路由守卫
})
export class AppRoutingModule { }
