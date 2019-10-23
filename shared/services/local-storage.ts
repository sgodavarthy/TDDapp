import {Injectable} from '@angular/core';
import { of } from 'rxjs/observable/of';

import { Observable } from 'rxjs/Observable';
import {Member} from '../models/member';
import 'rxjs/add/operator/map';
import { Program } from '../../shared/models/Program';
import { environment } from '../../../environments/environment';

import {Language}  from '../../shared/enums/language';
import * as jsPDF from 'jspdf'



@Injectable()
export class LocalStorage {

   _member:Member = {FirstName:""};
   _memberResponse:any;
   _therapeuticAres:any;
   _attributes:any;
   _securityquestions:any;

  GetMember(){
      return this._member;
  }

  SaveMember(member:Member){
      this._member = member;
  }

  ClearMember(){
      this._member = {FirstName:""};
  }

  ClearMemberResponse(){
    this._memberResponse = undefined;
}

  SaveMemberResponse(response:any){
   this._memberResponse = response;
  }

  GetMemberResponse():any{
      if(this._memberResponse === undefined){
          return null;
      }
      else{
        return this._memberResponse;
      }
      
  }

  SaveAttributesResponse(response:any){
    this._attributes = response;
   }

   SaveSecurityQuestionsResponse(response:any){
    this._securityquestions = response;
   }

  SavetherapeuticAresResponse(response:any){
    this._therapeuticAres = response;
   }
 
   GettherapeuticAresResponse():any{
       return this._therapeuticAres;
   }

   GetAttributesResponse():any{
    if(this._attributes === undefined){
        return null;
    }
    else{
      return this._attributes;
    }
  }

  GetSecurityQuestionResponse():any{
    if(this._securityquestions === undefined){
        return null;
    }
    else{
      return this._securityquestions;
    }
  }



  
   

    constructor() {

       
    }


}