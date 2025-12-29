
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Function to decode the JWT and extract the role
const getRoleFromToken = (token: string): string | null => {
  try {
    // In a real application, you would use a library like `jwt-decode` to decode the token
    // For this demo, we'll just parse the payload from the dummy JWT
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch (e) {
    return null;
  }
};

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const expectedRole = route.data['role'];

  if (!token) {
    // If there's no token, redirect to the login page
    return router.parseUrl('/login');
  }

  const role = getRoleFromToken(token);

  if (role === expectedRole) {
    return true;
  }

  // If the user does not have the required role, redirect to a "not authorized" page
  return router.parseUrl('/unauthorized');
};
