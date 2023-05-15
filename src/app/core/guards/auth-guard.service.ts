import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SessionStorageService } from "../services/session-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isLoggedIn = this.storage.isLoggedIn();
    if (!isLoggedIn) {
      this.router.createUrlTree(["/login"]);
      return false;
    }

    return true;
  }

  constructor(private router: Router, private storage: SessionStorageService) {}
}
