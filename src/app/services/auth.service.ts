import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '../models/login.model';
import { SignUp } from '../models/sign-up.model';
import { Router } from '@angular/router';


const api_url ="https://localhost:44337/api/Users"


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;


  constructor(private http: HttpClient, private router: Router ) { }


  // signupUser(signupUserModel: SignupUserModel): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/signup`, signupUserModel);

  // signupUser(userModel: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const body = JSON.stringify(userModel);

  //   return this.http.post<any>(`${this.apiUrl}/signup`, body, { headers });
  // }

  signup(body:any): Observable<SignUp>{
    return this.http.post<SignUp>(api_url + '/signup', body)
  }

  login(body:any): Observable<Login>{
    return this.http.post<Login>(api_url + '/login', body, { responseType: 'json'})

  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  logout(){
    this.isAuthenticated = false;
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getToken(){
    return localStorage.getItem('token')
  }

  

}
