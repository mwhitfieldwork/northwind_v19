import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RefreshGuard implements CanActivate {
  isLogin = false; // Prevent repeated refreshes

  constructor(private router: Router) {}

  canActivate(){
    return true; // Allow navigation
  }
}