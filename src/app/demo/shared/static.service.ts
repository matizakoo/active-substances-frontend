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
    static activeSubstancesDiseasesConflicts: string = 'activeSubstancesDiseasesConflicts';
    static searchEngine: string = 'searchEngine';
    static patient: string = 'patient';
    static headers = new HttpHeaders({
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json'
    });

    static parseJwt(): any | null {
        try {
            let token:string = localStorage.getItem('auth-token')
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Invalid JWT token", error);
            return null;
        }
    }
  constructor() { }
}
