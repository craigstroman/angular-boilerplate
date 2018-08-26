import { Injectable } from '@angular/core';
import { SessionService } from '../SessionService/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _session: SessionService,
  ) { }

  public isSignedIn() {
    if (this._session.getSession()) {
      return this._session.getSession();
    }
    return !!this._session.accessToken;
  }

  public doSignOut() {
    this._session.destroy();
  }

  public doSignIn(accessToken: string) {
    if ((!accessToken)) {
      return;
    }
    this._session.accessToken = accessToken;
  }
}
