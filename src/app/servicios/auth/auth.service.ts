import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dominio=environment.dominio;
  constructor(private _http: HttpClient,private router:Router ) { 
    
  }
  readonly ISLOGGEDKEY =  environment.ISLOGGEDKEY;
  public urlUsuarioIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  login() {
    
//    localStorage.setItem(this.ISLOGGEDKEY, 'true');
//    this.changeLoginStatusSubject.next(true);
  }
  loginhttp(data){
    return this._http.post<any>(`${this.dominio}login`,data)
    .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user.user));
        localStorage.setItem('token', JSON.stringify(user.token));
        localStorage.setItem(this.ISLOGGEDKEY, user.token);
        this.changeLoginStatusSubject.next(user.user);
        return user;
    }));
  }

  logout() {
    localStorage.removeItem(this.ISLOGGEDKEY);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.changeLoginStatusSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(url: string) {
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);
    if (!isLogged) {
      this.urlUsuarioIntentaAcceder = url;
      return false;
    }
    return true;
  }
}
