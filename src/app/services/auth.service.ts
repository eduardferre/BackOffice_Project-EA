import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiURL + '/api';

  constructor(private http: HttpClient, private router: Router) { }

  login(admin: Admin): Observable<string> {
    return this.http.post(this.url + '/admins/login', admin, {responseType: 'text'});
  }

  register(admin: Admin): Observable<string> {
    return this.http.post(this.url + '/admins/register', admin, {responseType: 'text'});
  }

  getToken() {
    const token = localStorage.getItem('token');
    console.log(token);
    return token;
  }  

  loggedIn(): Boolean {
    return !!localStorage.getItem('token');
  }
  
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }
}