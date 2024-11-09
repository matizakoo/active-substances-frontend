import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ActivesubstancesdiseasesModel} from "../model/activesubstancesdiseases-model";
import {StaticService} from "../shared/static.service";
import {HttpClient} from "@angular/common/http";
import {SearchengineDTO} from "../modelDTO/searchengineDTO";
import {SearchEngineModel} from "../model/searchEngine-model";

@Injectable({
  providedIn: 'root'
})
export class AsSearchEngineService {

  constructor(private http: HttpClient) { }

    getActiveSubstanceSearchEngine(searchEngine: SearchengineDTO): Observable<SearchEngineModel[]> {
        return this.http.post<SearchEngineModel[]>(StaticService.apiUrl + StaticService.doctor + StaticService.searchEngine, searchEngine);
    }
}
