import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {ActivesubstanceModel} from "../model/activesubstance-model";
import {Observable} from "rxjs";
import {InfoDTO} from "../../info-dto";
import {StaticService} from "../shared/static.service";
import {PatientDto} from "../modelDTO/patient-dto";
import {PatientModel} from "../model/patient-model";
import {PatientDiseaseSubstanceModel} from "../model/patientDiseaseSubstance-model";
import {DiseaseModel} from "../model/diseaseModel";
import {PatientDiseaseDto} from "../modelDTO/Patient-disease-dto";

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    constructor(private http: HttpClient) {
    }

    addPatient(patient: PatientDto): Observable<HttpResponse<InfoDTO>> {
        //TODO: generic headers
        const headers = new HttpHeaders({
            'auth-token': localStorage.getItem('auth-token'),
            'Content-Type': 'application/json'
        });

        let params = new HttpParams().set('principal', StaticService.parseJwt().principal);

        return this.http.post<InfoDTO>(
            StaticService.apiUrl + StaticService.doctor + StaticService.patient,
            patient,
            {headers, params, observe: 'response'}
        );
    }

    getAllPatients(): Observable<PatientModel[]> {
        return this.http.get<PatientModel[]>(StaticService.apiUrl+StaticService.doctor+StaticService.patient+'/all');
    }

    getAllPatientsForDoctor(id: string): Observable<PatientModel[]> {
        return this.http.get<PatientModel[]>(StaticService.apiUrl+StaticService.doctor+StaticService.patient+'/all'+'?idPatient='+id);
    }

    getSinglePatient(idPatient: number): Observable<PatientDiseaseSubstanceModel> {
        const params = new HttpParams().set('idPatient', idPatient);
        return this.http.get<PatientDiseaseSubstanceModel>(StaticService.apiUrl+StaticService.doctor+StaticService.patient+'/getOne',
            {params})
    }

    getAvailableDiseasesForPatient(idPatient: number): Observable<DiseaseModel[]> {
        const params = new HttpParams().set('idPatient', idPatient);
        return this.http.get<DiseaseModel[]>(StaticService.apiUrl+StaticService.doctor+StaticService.patient+'/getDiseasesForPatient',
            {params})
    }

    deletePatient(idPatient: number): Observable<InfoDTO> {
        const params = new HttpParams().set('idPatient', idPatient);
        return this.http.delete<InfoDTO>(StaticService.apiUrl+StaticService.doctor+StaticService.patient+'/deletePatient',
            {params})
    }

    deleteDisease(idPatient: number, idDisease: number): Observable<InfoDTO> {
        let params = new HttpParams()
            .set('id', idPatient.toString())
            .set('id2', idDisease.toString());

        console.log('dane: ', idPatient, idDisease)
        return this.http.delete<InfoDTO>(StaticService.apiUrl+StaticService.doctor+StaticService.patient+'/deleteDiseaseForPatient', {params})
    }



    addDiseasForPatient(patientDiseaseDto: PatientDiseaseDto): Observable<HttpResponse<InfoDTO>> {
        const headers = new HttpHeaders({
            'auth-token': localStorage.getItem('auth-token'),
            'Content-Type': 'application/json'
        });
        return this.http.post<InfoDTO>(StaticService.apiUrl+StaticService.doctor+StaticService.patient+'/addNewDiseaseForPatient',
            patientDiseaseDto,
            {headers, observe: 'response'})
    }


}
