import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { getAuth } from 'firebase/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const messageService = inject(MessageService);
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return next(req);
  }

  return from(user.getIdToken()).pipe(
    switchMap((token: string) => {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(cloned);
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        messageService.add({
          severity: 'error',
          summary: 'Unauthorized',
          detail: 'You are not authorized to perform this action.',
        });
        router.navigate(['/login']);
      } else {
        messageService.add({
          severity: 'error',
          summary: 'API Error',
          detail: error.message,
        });
      }
      return throwError(() => error);
    })
  );
};
