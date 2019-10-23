
import {Program} from '../../shared/models/Program';

export interface ProgramUser extends Program {
    StartDate?: string;
    CompletedDate?: string;
    SiteUserId?:number;
}