import {TherapeuticArea} from '../../shared/models/TherapeuticArea';

import {Language} from '../../shared/enums/language';

export interface Program {
    ProgramID?: number;
    Name?: string;
    Description?:string;
    ShortName?:string;
    TherapeuticAreas?:TherapeuticArea[];
    SiteId?:number;
    TherapeuticArea?:string;
    Accreditation?:string;
    LearningObjectives?:string;
    LiveDate?:string;
    OnlineExpiryDate?:string;
    Language?:Language;
    StartDate?: string;
    CompletedDate?: string;
    SiteUserId?:number;
    ContentFilePath?:string;
    ProgramTypeID?:number;
    SiteUserName?:string;
    state?:string;
}



