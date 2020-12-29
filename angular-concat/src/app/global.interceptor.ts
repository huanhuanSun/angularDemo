/**请求拦截器的步骤 https://angular.cn/guide/http#write-an-interceptor */

import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth_token');
    const authReq = req.clone({
        headers: req.headers.set('X-Access-Token', token)
    });
    return next.handle(authReq);
  }
}