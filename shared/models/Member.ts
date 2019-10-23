import {MemberAttribute} from '../../shared/models/MemberAttributes';
import {MemberSecurityQuestion} from '../../shared/models/MemberSecurityQuestion';

export interface Member {
    ExternalMemberId?:string,
    MemberId?:number,
    FirstName?: string;
    LastName?: string;
    MemberStatusId?:number;
    OrganizationId?:number;
    RoleId?:number;
    Password?:string;
    OneTimeAccessCode?:string;
    ConfirmPassword?:string;
    Email?:string;
    LockedUntil?:string;
    PasswordAttempts?:number;
    Username?:string;
    MemberAttributes?:MemberAttribute[];
    MemberSecurityQuestions?:MemberSecurityQuestion[];
    token?:any;
}