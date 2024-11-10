import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ActivesubstanceModel} from "../model/activesubstance-model";
import {Observable} from "rxjs";
import {InfoDTO} from "../../info-dto";
import {StaticService} from "../shared/static.service";
import {DiseaseDTO} from "../modelDTO/disease-dto";
import {DiseaseModel} from "../model/diseaseModel";

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

    constructor(private http: HttpClient) {}

    addDisease(substance: DiseaseDTO): Observable<HttpResponse<InfoDTO>> {
        const headers = StaticService.headers;
        return this.http.post<InfoDTO>(
            StaticService.apiUrl+StaticService.doctor+StaticService.disease,
            substance,
            { headers, observe: 'response' }
        );
    }

    getDiseasesWithActiveSubstances(): Observable<DiseaseModel[]> {
        return this.http.get<DiseaseModel[]>(StaticService.apiUrl+StaticService.doctor+StaticService.disease);
    }

    getDiseasesWithActiveSubstancesWithoutConflict(id: number): Observable<DiseaseModel[]> {
        return this.http.get<DiseaseModel[]>(StaticService.apiUrl+StaticService.doctor+StaticService.activeSubstancesDiseasesConflicts + `/activeSubstanceId/${id}`);
    }

    deleteDisease(id: number): Observable<InfoDTO> {
        return this.http.delete<InfoDTO>(StaticService.apiUrl+StaticService.doctor+StaticService.disease + `/${id}`);
    }


}
