import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const token = localStorage.getItem('token');
    let tokenizeReq = req.clone({
      setHeaders:{
        'x-access-token': `${token}`
      }
    });
    console.log(tokenizeReq);
    return next.handle(tokenizeReq);
  }
}
