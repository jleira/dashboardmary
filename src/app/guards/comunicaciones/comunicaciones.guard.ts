import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionesGuard implements CanActivate {
  constructor() {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = localStorage.getItem('currentUser');
    if (user) {
      let us=JSON.parse(user);
      if(us.perfil_aplicacion==3){
        return true;
      }else{
        return false;
      }
    } else {
      return false;
    }
    }
}
