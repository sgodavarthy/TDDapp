import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LocalStorage } from '../../shared/services/local-storage';

import { UserManager, User, Log, WebStorageStateStore } from 'oidc-client';
import { environment } from '../../../environments/environment';

// const settings: any = {
//   authority: 'http://localhost:12406/identity',
//   client_id: 'memberclientportal',
//   redirect_uri: 'http://localhost:4200/signin-callback.html',
//   post_logout_redirect_uri: 'http://localhost:4200',
//   response_type: 'id_token token',
//   scope: 'openid profile email',

//   silent_redirect_uri: 'http://localhost:4200/silent-renew.html',
//   automaticSilentRenew: true,
//   accessTokenExpiringNotificationTime: 4,
//   // silentRequestTimeout:10000,

//   filterProtocolClaims: true,
//   loadUserInfo: true
// };



// const settings: any = {
//   authority: environment.identityapi,
//   client_id: 'memberclientportal',
//   redirect_uri: environment.selfurl +'/signin-callback.html',
//   post_logout_redirect_uri: environment.selfurl,
//   response_type: 'id_token token',
//   scope: 'openid profile email MemberAPI LmsServicesAPI',

//   silent_redirect_uri: environment.selfurl + '/silent-renew.html',
//   automaticSilentRenew: true,
//   accessTokenExpiringNotificationTime: 4,
//   // silentRequestTimeout:10000,

//   filterProtocolClaims: true,
//   loadUserInfo: true
// };


const settings: any = {
  authority: 'http://kfmc.auth0.com',
  client_id: 'kPUCka2IXUHlg3f8lGqLQnXXnI3g14F7',
  redirect_uri: environment.selfurl +'/signin-callback.html',
  post_logout_redirect_uri: environment.selfurl,
  response_type: 'id_token token',
  scope: 'openid profile email phone address',

  silent_redirect_uri: environment.selfurl + '/silent-renew.html',
  automaticSilentRenew: true,
  accessTokenExpiringNotificationTime: 4,
  // silentRequestTimeout:10000,

  filterProtocolClaims: true,
  loadUserInfo: true
};




@Injectable()
export class AuthService {
  presentRouteUrl:string= "";
  mgr: UserManager = new UserManager(settings);
  userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User;
  loggedIn = false;

  authHeaders: Headers;


  constructor(private http: Http,private LocalStorage:LocalStorage) {

    this.mgr.getUser()
      .then((user) => {
        if (user) {
          this.loggedIn = true;
          this.currentUser = user;
          this.userLoadededEvent.emit(user);
        }
        else {
          this.loggedIn = false;
        }
      })
      .catch((err) => {
        this.loggedIn = false;
      });

    this.mgr.events.addUserLoaded((user) => {
      this.currentUser = user;
      
        console.log('authService addUserLoaded and memeber loaded', user);

    });


    this.mgr.events.addUserUnloaded((e) => {
        console.log('user unloaded');
      this.loggedIn = false;
    });

  }

  isLoggedInObs(): Observable<boolean> {
    return Observable.fromPromise(this.mgr.getUser()).map<User, boolean>((user) => {
      if (user) {
        //this.LocalStorage._member.FirstName = this.currentUser.profile.given_name != undefined? this.currentUser.profile.given_name: this.LocalStorage._member.FirstName;
        this.LocalStorage._member.MemberId = this.currentUser.profile.sub;
        this.LocalStorage._member.token = this.currentUser.id_token;
        return true;
      } else {
        return false;
      }
    });
  }

  clearState() {
    this.mgr.clearStaleState().then(function () {
      console.log('clearStateState success');
    }).catch(function (e) {
      console.log('clearStateState error', e.message);
    });
  }

  getUser() {
    this.mgr.getUser().then((user) => {
      this.currentUser = user;
      console.log('got user', user);
      this.userLoadededEvent.emit(user);
    }).catch(function (err) {
      console.log(err);
    });
  }

  removeUser() {
    this.mgr.removeUser().then(() => {
      this.userLoadededEvent.emit(null);
      console.log('user removed');
    }).catch(function (err) {
      console.log(err);
    });
  }

  startSigninMainWindow() {
    this.mgr.signinRedirect({ acr_values:'organizationid:1' }).then(function () {
      console.log('signinRedirect done');
    }).catch(function (err) {
      console.log(err);
    });
  }
  endSigninMainWindow() {
    this.mgr.signinRedirectCallback().then(function (user) {
      console.log('signed in', user);
    }).catch(function (err) {
      console.log(err);
    });
  }

  startSignoutMainWindow() {
    this.mgr.signoutRedirect().then(function (resp) {
      console.log('signed out', resp);
      setTimeout(5000, () => {
        console.log('testing to see if fired...');

      });
    }).catch(function (err) {
      console.log(err);
    });
  };

  endSignoutMainWindow() {
    this.mgr.signoutRedirectCallback().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      console.log(err);
    });
  };
  /**
   * Example of how you can make auth request using angulars http methods.
   * @param options if options are not supplied the default content type is application/json
   */
  AuthGet(url: string, options?: RequestOptions): Observable<Response> {

    if (options) {
      options = this._setRequestOptions(options);
    }
    else {
      options = this._setRequestOptions();
    }
    return this.http.get(url, options);
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthPut(url: string, data: any, options?: RequestOptions): Observable<Response> {

    let body = JSON.stringify(data);

    if (options) {
      options = this._setRequestOptions(options);
    }
    else {
      options = this._setRequestOptions();
    }
    console.log(url);
    console.log(body);
    return this.http.put(url, body, options);
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthDelete(url: string, options?: RequestOptions): Observable<Response> {

    if (options) {
      options = this._setRequestOptions(options);
    }
    else {
      options = this._setRequestOptions();
    }
    return this.http.delete(url, options);
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthPost(url: string, data: any, options?: RequestOptions): Observable<Response> {

    let body = JSON.stringify(data);

    if (options) {
      options = this._setRequestOptions(options);
    } else {
      options = this._setRequestOptions();
    }
    return this.http.post(url, body, options);
  }


  private _setAuthHeaders(user: any): void {
    this.authHeaders = new Headers();
    this.authHeaders.append('Authorization', user.token_type + ' ' + user.access_token);
    if (this.authHeaders.get('Content-Type')) {

    } else {
      this.authHeaders.append('Content-Type', 'application/json');
    }
  }
  private _setRequestOptions(options?: RequestOptions) {
    if (this.loggedIn) {
      this._setAuthHeaders(this.currentUser);
    }
    if (options) {
      options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
    } else {
      options = new RequestOptions({ headers: this.authHeaders, body: '' });
    }

    return options;
  }

}


