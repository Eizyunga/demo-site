import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from "../services/auth/auth.service";

export const AuthGuard: CanActivateFn = (route, state): boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isLoggedIn()) {
    if (!authService.isVerified()) {
      console.log('here');
      router.navigate(['/verify']);
      return false;
    }
    return true;
  } else {
    router.navigate(['/login']); // User is not authenticated, redirect to login
    return false;
  }
};

export const VerifyGuard: CanActivateFn = (route, state): boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  console.log(authService.isLoggedIn());
  if (authService.isLoggedIn() && !authService.isVerified()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

