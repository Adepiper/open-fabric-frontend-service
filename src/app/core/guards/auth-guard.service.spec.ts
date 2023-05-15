import { TestBed } from "@angular/core/testing";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { SessionStorageService } from "../services/session-storage.service";

import { AuthGuardService } from "./auth-guard.service";

describe("AuthGuardService", () => {
  let guard: AuthGuardService;
  let sessionService: SessionStorageService;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    const spy = jasmine.createSpyObj("Router", ["createUrlTree"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuardService, SessionStorageService, { provide: Router, useValue: spy }],
    });
    guard = TestBed.inject(AuthGuardService);
    sessionService = TestBed.inject(SessionStorageService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>("RouterStateSnapshot", ["toString"]);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });

  it("should allow access if user is authenticated", () => {
    spyOn(sessionService, "isLoggedIn").and.returnValue(true);

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;

    expect(guard.canActivate(route, mockSnapshot)).toBe(true);
  });

  it("should prevent access if user is not authenticated", () => {
    spyOn(sessionService, "isLoggedIn").and.returnValue(false);

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    expect(guard.canActivate(route, mockSnapshot)).toBe(false);
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(["/login"]);
  });
});
