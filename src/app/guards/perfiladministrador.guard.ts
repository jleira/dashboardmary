import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'app/servicios/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PerfiladministradorGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = localStorage.getItem('currentUser');
    console.log("current", user);
    if (user) {
      user = JSON.parse(user);
      console.log(user);
      if (user['perfil_aplicacion'] == 1) {
        return true;
      } else {
        this.authService.logout();
      }

    } else {
      return false
    }


  }
}
