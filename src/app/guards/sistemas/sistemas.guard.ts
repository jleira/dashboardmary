import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SistemasGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("entra al canactivate");
    let user = localStorage.getItem('currentUser');
    if (user) {
      let us=JSON.parse(user);
      if(us.perfil==4){
        return true;
      }else{
        return false;
      }
    } else {
      return false;
    }
  } 
}
