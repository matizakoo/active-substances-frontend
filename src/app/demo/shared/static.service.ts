import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticService {
    static apiUrl: string = 'http://localhost:8080/';
    static doctor: string = 'doctor/';
    static activesubstances: string = 'activeSubstances';
  constructor() { }
}
