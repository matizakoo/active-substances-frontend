import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ActivesubstanceModel} from "../model/activesubstance-model";
import {Observable} from "rxjs";
import {StaticService} from "../shared/static.service";
import {InfoDTO} from "../../info-dto";

@Injectable({
  providedIn: 'root'
})
export class ActivesubstancesService {

    constructor(private http: HttpClient) {}

    addActiveSubstance(substance: ActivesubstanceModel): Observable<HttpResponse<InfoDTO>> {
        //TODO: generic headers
        const headers = new HttpHeaders({
            'auth-token': localStorage.getItem('auth-token'),
            'Content-Type': 'application/json'
        });
        return this.http.post<InfoDTO>(
            StaticService.apiUrl+StaticService.doctor+StaticService.activesubstances,
            substance,
            { headers, observe: 'response' }
        );
    }

    getActiveSubstances(): Observable<ActivesubstanceModel[]> {
        return this.http.get<ActivesubstanceModel[]>(StaticService.apiUrl+StaticService.doctor+StaticService.activesubstances);
    }

    deleteActiveSubstance(id: number): Observable<InfoDTO> {
        return this.http.delete<InfoDTO>(StaticService.apiUrl+StaticService.doctor+StaticService.activesubstances + `/${id}`);
    }


}
