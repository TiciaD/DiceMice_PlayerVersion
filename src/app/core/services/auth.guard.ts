import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isAuthed = computed(() => !!auth.currentUser());

  if (isAuthed()) {
    return true;
  }

  // Optional: redirect unauthenticated users
  router.navigate(['/login'], {
    queryParams: { redirectTo: state.url },
  });

  return false;
};
