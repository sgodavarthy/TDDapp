import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions,Headers} from '@angular/http';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import {User} from '../models/user';
import 'rxjs/add/operator/map';
import { TherapeuticArea } from '../../shared/models/TherapeuticArea';
import { Certificate } from '../../shared/models/Certificate';
import { Program } from '../../shared/models/Program';
import { RefreshCompletedPrograms } from '../../shared/models/refresh';
import { environment } from '../../../environments/environment';



@Injectable()
export class ProgramService {

    TherapeuticAreaList: TherapeuticArea[] = [
    //     {Name: "All Programs", Value: 0},
    // {Name: "Diabetes", Value: 1},
    // {Name: "Woman’s Health", Value: 2},
    // {Name: "Geriatrics", Value: 3},
    // {Name: "Urology", Value: 4},
    // {Name: "Dermatology", Value: 5},
    // {Name: "Pediatrics", Value: 6},
    // {Name: "Cardiovascular", Value: 7},
    // {Name: "Infectious Disease", Value: 8},
    // {Name: "Medication", Value: 9},
    // {Name: "Respiratory", Value: 4},
    // {Name: "Geriatrics", Value: 5},
    // {Name: "Gastroenterology", Value: 6},
    // {Name: "Gastroenterology", Value: 6},
    // {Name: "Gastroenterology", Value: 6},
    // {Name: "Gastroenterology", Value: 6},
    // {Name: "Gastroenterology", Value: 6},
    // {Name: "Gastroenterology", Value: 6},
    // {Name: "Gastroenterology", Value: 6}
]

    

    ProgramsList: Program[] = [
        // {ProgramID: 123, Name: "Diabetes therapy", Description: "Description for program", TherapeuticArea: "Diabetes", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:"12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 124, Name: "Fertility therapy", Description: "Description for program", TherapeuticArea: "Woman’s Health", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English", SiteUserName:"surya"},
        // {ProgramID: 125, Name: "Overactive Bladder", Description: "Description for program", TherapeuticArea: "Geriatrics, Urology", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English", SiteUserName:"surya"},
        // {ProgramID: 126, Name: "Eczema Management", Description: "Description for program", TherapeuticArea: "Dermatology, Pediatrics", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 127, Name: "Biosimilars Innovation", Description: "Description for program", TherapeuticArea: "Diabetes", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 128, Name: "Seasonal Influenza Vaccination", Description: "Description for program", TherapeuticArea: "Infectious Disease", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 129, Name: "Newer long-acting basal insulin analogues", Description: "Description for program", TherapeuticArea: "Diabetes", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 130, Name: "Tobacco Use Disorder", Description: "Description for program", TherapeuticArea: "Medication", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 131, Name: "Hepatitis C", Description: "Description for program", TherapeuticArea: "Infectious Disease", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 132, Name: "Vasomotor Symptoms", Description: "Description for program", TherapeuticArea: "Women’s Health", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 133, Name: "Idiopathic Pulmonary Fibrosis", Description: "Description for program", TherapeuticArea: "Respiratory", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 134, Name: "Adult Asthma", Description: "Description for program", TherapeuticArea: "Respiratory", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 135, Name: "Dermatitis", Description: "Description for program", TherapeuticArea: "Dermatology", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 136, Name: "Heart Attacks", Description: "Description for program", TherapeuticArea: "Cardiovascular", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 137, Name: "Functional Constipation", Description: "Description for program", TherapeuticArea: "Gastroenterology", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        // {ProgramID: 138, Name: "Acne", Description: "Description for program", TherapeuticArea: "Dermatology", LearningObjectives:"learn", CompletedDate:"12-12-2012",
        // LiveDate:" 12-12-2017", StartDate:"", Language:"English"},
        ];

        ProgramsListFeature:Program[]=[
            {ProgramID: 16968, Name: "Castration-Resistant Prostate Cancer: Optimizing Interdisciplinary Collaboration in an Evolving Management Environment", Description: "Description for program", TherapeuticArea: "Diabetes", LearningObjectives:"learn", CompletedDate:"12-12-2012",
            LiveDate:"12-12-2017", StartDate:"", ContentFilePath:"MedicalCannabis_Tilrey_1488/content_rx_km.program"},
            {ProgramID: 16972, Name: "Ambulatory Glucose Profile: The New Frontier in Diabetes Management", Description: "Description for program", TherapeuticArea: "Woman’s Health", LearningObjectives:"learn", CompletedDate:"12-12-2012",
            LiveDate:" 12-12-2017", StartDate:"", ContentFilePath:"ColorectalScreening_410/content_km.program"},
            {ProgramID: 16979, Name: "Natural Health Products (NHPs) for preventing cold symptoms in adults", Description: "Description for program", TherapeuticArea: "Infectious Disease, Public Health", LearningObjectives:"learn", CompletedDate:"12-12-2012",
            LiveDate:" 12-12-2017", StartDate:"", ContentFilePath:"AcneTreatment_3526/content_km.program"},
            {ProgramID: 16986, Name: "Pharmacists Partnering with Patients and Families to Optimize ADHD Management", Description: "Description for program", TherapeuticArea: "Mental Health", LearningObjectives:"learn", CompletedDate:"12-12-2012",
            LiveDate:" 12-12-2017", StartDate:"", ContentFilePath:"MaleLUTS_2501/content_km.program"},
        ]

    public RefreshCompletedPrograms:RefreshCompletedPrograms = {};
    public ProgramDetail:Program = {};

    public ProgramCertificate:Program = {}

    constructor(private http: Http) {}

    getPrograms()
    {
        //return this.http.get(environment.memberurl +"/api/Program/").map((response: Response) => response.json());
        return this.ProgramsList;
    }

    getAllPrograms(page:number, search:string)
    {

        return this.http.get(environment.lmsapi +"/api/Program?siteid=" + environment.siteid +"&Page=" + page +"&fulltextfilter=" + search).retry(5).map((res:Response)  => res.json(),(err) =>{throw err});
        //return this.ProgramsList;
    }

    SearchTherapeuticArea(TherapeuticAreaID:number, page:number)
    {
 
        return this.http.get(environment.lmsapi +"/api/Program?TherapeuticAreaId=" + TherapeuticAreaID + "&siteid=" + environment.siteid + "&Page=" + page).retry(5).map((res:Response)  => res.json(),(err) =>{throw err});
        //return this.ProgramsList;
    }

    SearchPrograms(text:string, page:number)
    {

        return this.http.get(environment.lmsapi +"/api/Program?siteid=" + environment.siteid + "&fulltextfilter=" + text + "&Page=" + page).retry(5).map((res:Response)  => res.json(),(err) =>{throw err});
        //return this.ProgramsList;
    }

    GetProgramByProgramID(programId:number)
    {


        
        return this.http.get(environment.lmsapi +"/api/Program?siteid=" + environment.siteid + "&programid=" + programId).retry(3).map((res:Response)  => res.json(),(err) =>{throw err});
        //return this.ProgramsList;
        
    }

    GetProgramProgress(page:number, userId:number, token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization", "Bearer " + token);     
        let options = new RequestOptions({ headers: headers });
        return this.http.get(environment.lmsapi +"/api/programprogress?siteid=" + environment.siteid +"&Page=" + page + "&userid="+ userId + "&PageSize=5", options).retry(5).map((res:Response)  => res.json(),(err) =>{throw err});
    }

    GetProgramCompleted(page:number, userId:number, token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization", "Bearer " + token);     
        let options = new RequestOptions({ headers: headers });
        return this.http.get(environment.lmsapi +"/api/CompletedProgram?SiteId=" + environment.siteid +"&Page=" + page + "&SiteUserId="+ userId + "&PageSize=5", options).retry(5).map((res:Response)  => res.json(),(err) =>{throw err});
    }


    getTherapeuticAreas():Observable<TherapeuticArea[]>
    {
        return this.http.get(environment.lmsapi +"/api/therapeuticarea?culturename=en&siteid=" + environment.siteid).retry(3).map((res:Response)  => res.json(),(err) =>{throw err});
        //return of(this.TherapeuticAreaList);
    }

    getProgramDetail():Observable<Program>{
        return of(this.ProgramDetail);
    }

    getProgramsInProgress():Observable<Program[]>{
        return of(this.ProgramsListFeature);
    }

    getProgramsCompleted():Observable<Program[]>{
        return of(this.ProgramsListFeature);
    }


    SetProgramDetail(program:Program){
        this.ProgramDetail = program;
    }

    SetProgramCertificate(ProgramCertificate:Program){
        this.ProgramCertificate = ProgramCertificate;
    }


    GetProgramCertificate():Certificate{
        return this.ProgramCertificate;
    }

    ClearCertificate(){
        this.ProgramCertificate = {};
    }

    FulfillmentService(memberId:number){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.RefreshCompletedPrograms.siteid = 11;
        this.RefreshCompletedPrograms.userid = memberId;
        return this.http.post(environment.lmsapi +"/api/Fulfillment/", JSON.stringify(this.RefreshCompletedPrograms), options).retry(3).map((res:Response)  => res.text() ? res.json() : res,(err) =>{throw err});

    }

}
