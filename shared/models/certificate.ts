
import {Language} from '../../shared/enums/language';

export interface Certificate {
    UserName?: string;
    Date?: string;
    ProgramName?: string;
    ProgramID?:number;
    SiteUserId?:number;
    Language?:Language;
}