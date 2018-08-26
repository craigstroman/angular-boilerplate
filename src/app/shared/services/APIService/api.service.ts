import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { SessionService } from '../SessionService/session.service';
import { Posts, Post, Auth } from '../../interfaces/APIService';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient,
    private _session: SessionService
  ) { }

  /**
   * Logs a user into the API.
   *
   * @param      {String}  username  The username
   * @param      {String}  password  The password
   * @return     {Object}  The JSON web token response.
   */
  public signIn(username: string, password: string) {
    return this._http
      .post<Auth>(`${environment.apiUrl}/auth/login`, {
        username,
        password
      })
      .pipe(map(res => {
          // login successful if there's a jwt token in the response
          if (res && res.access_token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(res));
          }

          return res;
      }));
  }

  /**
   * Gets all the posts.
   *
   * @return     {Object}  The posts.
   */
  public getPosts() {
      const options = this._getRequestOptions();

      return this._http
                  .get<Posts[]>(`${environment.apiUrl}/posts`, options);
  }

  /**
   * Gets a single post.
   *
   * @param      {Number}  id      The id number.
   * @return     {Array}  The post, is item 0 of the array.
   */
  public getPost(id: number)  {
      const options = this._getRequestOptions();

      return this._http
                  .get<Posts[]>(`${environment.apiUrl}/posts?id=${id}`, options);
  }

  /**
   * Returns authorization for all requests to the API.
   *
   * @return     {Object}  The request options.
   */
  private _getRequestOptions() {
    const headers = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this._session.getSession()}`)
    }

    return headers;
  }
}
