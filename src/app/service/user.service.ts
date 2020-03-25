import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor( private _http:HttpClient) {}

  getUserList() {
    return this._http.get('https://jsonplaceholder.typicode.com/users');
  }

  getUserInfo(userId) {
    return this._http.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  }
}
