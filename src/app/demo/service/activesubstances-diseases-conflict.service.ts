import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {ActiveSubstanceConflictDTO} from "../modelDTO/activesubstancesconflict-dto";
import {Observable} from "rxjs";
import {InfoDTO} from "../../info-dto";
import {StaticService} from "../shared/static.service";
import {ActiveSubstanceConflictModel} from "../model/activesubstancesconflict-model";
import {ActivesubstancesDiseaseDto} from "../modelDTO/activesubstances-disease-dto";
import {ActivesubstancesdiseasesModel} from "../model/activesubstancesdiseases-model";

@Injectable({
  providedIn: 'root'
})
export class ActivesubstancesDiseasesConflictService {

    constructor(private http: HttpClient) { }

    addActiveSubstancesDiseasesConflict(activesubstancesDiseaseDto: ActivesubstancesDiseaseDto): Observable<HttpResponse<InfoDTO>> {
        const headers = StaticService.headers;
        return this.http.post<InfoDTO>(
            StaticService.apiUrl+StaticService.doctor+StaticService.activeSubstancesDiseasesConflicts,
            activesubstancesDiseaseDto,
            { headers, observe: 'response' }
        );
    }

    getActiveSubstancesDiseasesConflict(): Observable<ActivesubstancesdiseasesModel[]> {
        return this.http.get<ActivesubstancesdiseasesModel[]>(StaticService.apiUrl+StaticService.doctor+StaticService.activeSubstancesDiseasesConflicts);
    }

    deleteActiveSubstanceWithDisease(id: number, id2: number): Observable<InfoDTO> {
        let params = new HttpParams()
            .set('id', id.toString())
            .set('id2', id2.toString());
        return this.http.delete<InfoDTO>(StaticService.apiUrl+StaticService.doctor+StaticService.activeSubstancesDiseasesConflicts, {params})
    }
}
