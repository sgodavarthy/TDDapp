import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import {User} from '../models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {}

    public isLoggedIn:boolean = false;
    public user:User;


    UserLoggedIn():boolean{
        return this.isLoggedIn;
    }
    
    UpdateUser(user:User)
    {
        this.isLoggedIn = true;
        this.user = user;
    }
    getUser(): Observable<User>{
        return of(this.user);
    }

       

}