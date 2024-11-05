import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StaticService {
    static apiUrl: string = 'http://localhost:8080/';
    static doctor: string = 'doctor/';
    static activesubstances: string = 'activeSubstances';
    static disease: string = 'disease';
    static activeSubstancesConflicts: string = 'activeSubstancesConflicts';
    static headers = new HttpHeaders({
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json'
    });
  constructor() { }
}
