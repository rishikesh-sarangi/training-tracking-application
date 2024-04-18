import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const loggedInSave = localStorage.getItem('loggedInSave');
  const loggedInTemp = localStorage.getItem('loggedInTemp');
  return loggedInSave == 'true' || loggedInTemp == 'true';

  // if (loggedin == 'true') {
  //   return true;
  // }
  // return false;
};
