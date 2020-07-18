import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGardGuard implements CanActivate {
  constructor(private AuthService: AuthenticationService ,private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.AuthService.Islogin === true)
      {
        return true;
      }
      else{
        this.router.navigate(['/login'], {queryParams: {returUrl: state.url}});
        return false;
      }
  }

}
