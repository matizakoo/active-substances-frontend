import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Category} from "./category";
import {map} from "rxjs/operators";
import {InfoDTO} from "../../../info-dto";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'http://localhost:8085/category';

    constructor(private http: HttpClient) { }


    createCategory(category: string): Observable<HttpResponse<InfoDTO>> {
        return this.http.post<InfoDTO>(`${this.apiUrl}`, category , { observe: 'response' })
            .pipe(
                map(response => response),
                catchError(this.handleError)
            );
    }

    deleteCategory(data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.delete<any>(this.apiUrl, { headers, body:data, observe: 'response' as 'response' }).pipe(
            catchError(this.handleError)
        );
    }



    private handleError(error: HttpErrorResponse) {
        console.error('Server error:', error);
        return throwError(() => new Error('Failed to create category. Please try again later.'));
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl);
    }
}
