
import {MemberAttribute} from '../../shared/models/MemberAttributes';


export class MemberClass {

    ExternalMemberId?: string;
    MemberId?: number;
    FirstName?: string;
    LastName?: string;
    MemberStatusId = 1;
    OrganizationId? = 1;
    RoleId? = 1;
    Password?: string;
    OneTimeAccessCode? = '24e2a6cc-50b0-475f-822c-a3361b8bb1b0';
    ConfirmPassword?: string;
    Email?: string;
    LockedUntil? = '2016-01-01T00:00:00.0000000-00:00';
    PasswordAttempts? = 0;
    Username?: string;
    MemberAttributes?: MemberAttribute[];
    token?: any;


    constructor(

        ) { }

}
