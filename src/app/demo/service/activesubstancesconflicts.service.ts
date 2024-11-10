import { Injectable } from '@angular/core';
import {DiseaseDTO} from "../modelDTO/disease-dto";
import {Observable} from "rxjs";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {InfoDTO} from "../../info-dto";
import {StaticService} from "../shared/static.service";
import {ActiveSubstanceConflictModel} from "../model/activesubstancesconflict-model";
import {ActiveSubstanceConflictDTO} from "../modelDTO/activesubstancesconflict-dto";

@Injectable({
  providedIn: 'root'
})
export class ActivesubstancesconflictsService {

  constructor(private http: HttpClient) { }

    addSubstanceConflicts(substancesConflicts: ActiveSubstanceConflictDTO): Observable<HttpResponse<InfoDTO>> {
        const headers = StaticService.headers;
        return this.http.post<InfoDTO>(
            StaticService.apiUrl+StaticService.doctor+StaticService.activeSubstancesConflicts,
            substancesConflicts,
            { headers, observe: 'response' }
        );
    }

    getSubstanceConflicts(): Observable<ActiveSubstanceConflictModel[]> {
        return this.http.get<ActiveSubstanceConflictModel[]>(StaticService.apiUrl+StaticService.doctor+StaticService.activeSubstancesConflicts);
    }

    deleteSustancesConflict(id: number, id2: number): Observable<InfoDTO> {
        let params = new HttpParams()
            .set('id', id.toString())
            .set('id2', id2.toString());
      return this.http.delete<InfoDTO>(StaticService.apiUrl+StaticService.doctor+StaticService.activeSubstancesConflicts, { params })
    }
}
