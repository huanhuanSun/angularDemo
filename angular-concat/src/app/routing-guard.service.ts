//路由守卫
import {Inject, Injectable} from '@angular/core'
import {Router,CanActivate} from '@angular/router'

@Injectable()
export class RouteGuard implements  CanActivate{
    constructor(
        private router:Router
    ){}

    canActivate(){
        const user = localStorage.getItem('auth_token');
        if (!user) {
            this.router.navigate(['/signin'])
            return false // 不能继续导航
        }
        return true;
    }
}