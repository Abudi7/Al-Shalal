import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from "rxjs/operators";
@Injectable({
providedIn: 'root'
})
export class ApiService {
constructor(private http: HttpClient) { }
async register(user:any){
const userInfo = {
'firstName': user['firstName'],
'lastName': user['lastName'],
'email': user['email'],
'username': user['username'],
'password': user['password'],
};
const httpOptions = {
headers: new HttpHeaders({
'Authorization': 'Bearer ' + 'secret',
'Content-Type': "application/json;charset=utf8",
'Access-Control-Allow-Origin': '*'
})
};
return this.http.post("http://localhost:8101/register", userInfo, 
httpOptions).toPromise();
}
async login(user:any){
const userInfo = {
'username': user['username'],
'password': user['password'],
};
const httpOptions = {
headers: new HttpHeaders({
'Authorization': 'Bearer ' + 'secret',
'Content-Type': "application/json;charset=utf8",
'Access-Control-Allow-Origin': '*'
})
};
return this.http.post("http://localhost:8101/login", userInfo, 
httpOptions).toPromise();
}
async getUserInfo(userId:any){
const httpOptions = {
headers: new HttpHeaders({
'Authorization': 'Bearer ' + 'secret',
'Content-Type': "application/json;charset=utf8",
'Access-Control-Allow-Origin': '*'
})
};
return this.http.get("http://localhost:8100/"+userId, httpOptions).toPromise();
}
}