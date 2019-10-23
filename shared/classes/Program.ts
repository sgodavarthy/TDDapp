
import { TherapeuticArea } from '../../shared/models/TherapeuticArea';

import { Program } from '../../shared/models/Program';

export class ProgramClass {

//have to use json-object-mapper with json decorators    
    constructor(

    ) { }


    TherapeuticAreaResponseMapper(response: any, TherapeuticArealist: TherapeuticArea[]): TherapeuticArea[] {


        TherapeuticArealist = [];
        TherapeuticArealist.push({ Name: "All Categories", Value: 0 });
        response.Response.forEach(ta => {
            var TherapeuticArea: TherapeuticArea = {state:'active'};
            TherapeuticArea.Name = ta.Name;
            TherapeuticArea.Value = ta.TherapeuticAreaID;
            if (ta.Name != "Other") {
                TherapeuticArealist.push(TherapeuticArea);
            }

        });

        return TherapeuticArealist;


    }


    TherapeuticAreMapper(Therapeuticlist: TherapeuticArea[]): string {

        var TherapeuticAreaString = "";
        Therapeuticlist.forEach(ta => {
            if (ta.Name != "Other") {
                TherapeuticAreaString = TherapeuticAreaString + ", " + ta.Name;
            }
        });
        return TherapeuticAreaString.substring(2);


    }


    TAIDPresent(Therapeuticlist: TherapeuticArea[], TAID: number): boolean {

        var BreakException = {};

        try {
            Therapeuticlist.forEach(ta => {
                if (ta.Value === TAID) {
                    throw BreakException;
                }
            });
            return false;
        }
        catch (e) {
            return true;
        }

    }


    ProgramMapper(Programlist: Program[], GetResponse: any): Program[] {


        try {
            Programlist = [];

            GetResponse.forEach(program => {

                var Program: Program = {state:'inactive'};


                Program.Accreditation = "";
                Program.ProgramID = program.ProgramId;
                Program.Name = program.ProgramName;
                Program.ContentFilePath = program.ContentFilePath;
                //Program.LearningObjectives = program.LearningObjectives;
                //Program.OnlineExpiryDate = program.OnlineExpiryDate;
                Program.Description = program.MetaDescription;
                //Program.SiteId = program.SiteId;
                //Program.LiveDate = program.LiveDate.substring(0, 10);
                //Program.Language = program.Language.LanguageName;

                var TherapeuticAreaList: TherapeuticArea[] = [];

                Program.TherapeuticArea = "";

                try{
                    program.ProgramTherapeuticAreas.forEach(pt => {
                        var TherapeuticArea: TherapeuticArea = {};
                        TherapeuticArea.Value = +pt.ProfessionTherapeuticArea.TherapeuticAreaID;
                        TherapeuticArea.Name = pt.ProfessionTherapeuticArea.TherapeuticArea.Name;
                        TherapeuticAreaList.push(TherapeuticArea);
                    });
    
                    Program.TherapeuticAreas = TherapeuticAreaList;
                    Program.TherapeuticArea = this.TherapeuticAreMapper(Program.TherapeuticAreas);
                }
                catch(e){

                }
               

                Programlist.push(Program);

            });

            return Programlist;

        }
        catch (e) {
            console.log(e);
            return Programlist = [];

        }

        //Programlist = [];



    }

    ProgramDetailMapper(Programlist: Program[], GetResponse: any): Program[] {
        
        
                try {
        
                    GetResponse.forEach(program => {
        
                        var Program: Program = {};
        
        
                        Program.Accreditation = "";
                        Program.ProgramID = program.ProgramId;
                        Program.Name = program.ProgramName;
                        Program.LearningObjectives = program.LearningObjectives;
                        Program.OnlineExpiryDate = program.OnlineExpiryDate;
                        Program.ContentFilePath = program.ContentFilePath;
                        Program.Description = program.MetaDescription;
                        Program.SiteId = program.SiteId;
                        Program.LiveDate = program.LiveDate.substring(0, 10);
                        Program.Language = program.Language.LanguageName;
        
                        var TherapeuticAreaList: TherapeuticArea[] = [];
        

                        Program.TherapeuticArea = "";
                        
                                        try{
                                            program.ProgramTherapeuticAreas.forEach(pt => {
                                                var TherapeuticArea: TherapeuticArea = {};
                                                TherapeuticArea.Value = +pt.ProfessionTherapeuticArea.TherapeuticAreaID;
                                                TherapeuticArea.Name = pt.ProfessionTherapeuticArea.TherapeuticArea.Name;
                                                TherapeuticAreaList.push(TherapeuticArea);
                                            });
                            
                                            Program.TherapeuticAreas = TherapeuticAreaList;
                                            Program.TherapeuticArea = this.TherapeuticAreMapper(Program.TherapeuticAreas);
                                        }
                                        catch(e){
                        
                                        }
        
                        Programlist.push(Program);
        
                    });
                    
        
                    return Programlist;
        
                }
                catch (e) {
        
                    return Programlist = [];
        
                }
        
                //Programlist = [];
        
        
        
            }



    ProgramProgressMapper(Programlist: Program[], GetResponse: any): Program[] {
        try {
            Programlist = [];
            GetResponse.forEach(programprogress => {

                var Program: Program = {};

                Program.Accreditation = "";
                Program.ProgramID = programprogress.ProgramID;
                Program.ProgramTypeID = programprogress.Program.ProgramTypeID;
                Program.Name = programprogress.Program.ProgramName;

                //Program.ContentFilePath = programprogress.Program.ContentFilePath;
                //Program.LearningObjectives = programprogress.Program.LearningObjectives;
                //Program.OnlineExpiryDate = programprogress.Program.OnlineExpiryDate;
                //Program.Description = programprogress.Program.MetaDescription;
                //Program.SiteId = programprogress.Program.SiteId;
                //Program.LiveDate = programprogress.Program.LiveDate.substring(0, 10);
                //Program.SiteUserId = programprogress.SiteUserID;

                Programlist.push(Program);
            });

            //Programlist = Array.from(new Set(Programlist.map((item: any) => item)));

            return Programlist;
        }
        catch (e) {

            return Programlist = [];

        }



    }


    ProgramsCompletedMapper(Programlist: Program[], GetResponse: any): Program[] {

        try {
            Programlist = [];
            var exists:boolean = false;
            GetResponse.forEach(programcompleted => {

                exists = false;
                Programlist.forEach(program => {
                  if(program.ProgramID === programcompleted.Accreditation.Program.ProgramId){
                    exists = true;
                  }

                });

                if(!exists){

               
                var Program: Program = {};

                Program.Accreditation = "";
                Program.ProgramID = programcompleted.Accreditation.Program.ProgramId;
                Program.Name = programcompleted.Accreditation.Program.ProgramName;
                Program.ProgramTypeID = programcompleted.Accreditation.Program.ProgramTypeID;
                Program.ContentFilePath = programcompleted.Accreditation.Program.ContentFilePath;
                //Program.LearningObjectives = programcompleted.LearningObjectives;
                //Program.OnlineExpiryDate = programcompleted.OnlineExpiryDate;
                //Program.Description = programcompleted.MetaDescription;
                //Program.SiteId = programcompleted.SiteId;
                //Program.LiveDate = programcompleted.LiveDate.substring(0, 10);
                Program.SiteUserId = programcompleted.SiteUserID;
                Program.CompletedDate = programcompleted.AcquiryDate.substring(0, 10);

                Programlist.push(Program);
                }
                
                
            });
            //Programlist = Array.from(new Set(Programlist.map((item: any) => item)));

            return Programlist;
        }
        catch (e) {
            console.log(e);
            return Programlist = [];

        }

    }


    RemoveDuplicates(myArr, prop) {
        myArr.filter((obj, pos, arr) => {
        arr.map(mapObj =>
        mapObj[prop]).indexOf(obj[prop]) === pos;
        });
        }



}
