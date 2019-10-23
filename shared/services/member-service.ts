import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { of } from 'rxjs/observable/of';

import { Observable } from 'rxjs/Observable';
import {Member} from '../models/member';
import 'rxjs/add/operator/map';
import { Program } from '../../shared/models/Program';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../shared/services/oauth.service';


import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";



@Injectable()
export class MemberService {

   member:Member = {};



   

    constructor(private http: Http, private AuthService:AuthService) {

       
    }

   SaveMember(member:Member){
       this.member = member;
   }

  MemberExist(){
    if(this.member == undefined && this.member.FirstName != ""){
       return false;
    }
    else{
      return true;
    }
  }

  GetCurrentMember(){
    return this.member;
  }

   getMember(id:number){
    console.log('inside save');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if(this.member != undefined){
      headers.append("Authorization", "Bearer " + this.member.token);
    }
    
    let options = new RequestOptions({ headers: headers });
     return this.AuthService.AuthGet(environment.memberurl +"/api/Member/" + id).retry(3).map((response: Response) => response.json());
     //return this.http.get(environment.memberurl +"/api/Member/" + id, options).map((res:Response)  => res.json(),(err) =>{throw err});
   }

   MemberSignUp(ExternalMemberId:string, email:string){
    console.log('inside signup');
    return this.http.get(environment.memberurl +"/api/Registration?externalMemberId=" + ExternalMemberId + "&email=" + email).retry(3).map((res:Response)  => res.json(),(err) =>{throw err});

  }

  MemberSignUpCheckEmail(email:string){
    console.log('inside signup');
    return this.http.get(environment.memberurl +"/api/Registration?email=" + email).map((res:Response)  => res.json()).catch(this.HandleError);

  }

  MemberSignUpCheckExternalID(ExternalMemberId:string){
    console.log('inside signup');
    return this.http.get(environment.memberurl +"/api/Registration?externalMemberId=" + ExternalMemberId).map((res:Response)  => res.json()).catch(this.HandleError);

  }

   RegisterMember(member:Member){
    console.log('inside save');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.memberurl +"/api/registration", JSON.stringify(member), options).retry(3).map((res:Response)  => res.json(),(err) =>{throw err});
     

  }


  UpdateMember(member:Member){
    console.log('inside update');
    let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append("Authorization", "Bearer " + this.AuthService.currentUser.access_token);
    
    
    let options = new RequestOptions({ headers: headers });
    //return this.AuthService.AuthPut(environment.memberurl +"/api/Member/" + member.MemberId, JSON.stringify(member)).map((res:Response)  => res.json(),(err) =>{throw err});
    return this.http.put(environment.memberurl +"/api/Member/" + member.MemberId, JSON.stringify(member), options).retry(3).map((res:Response)  => res.json(),(err) =>{throw err});

  }


   getSecurityQuestions(){
    console.log("returning questions");
    return this.http.get(environment.memberurl +"/api/SecurityQuestion").retry(3).map((res:Response)  => res.json(),(err) =>{throw err});
  }

  HandleError(err:any):Observable<boolean>{
    if(err.status == 404){
      return of(false);
    }

    else{
      return of(true);
    }
   
  }
       

}