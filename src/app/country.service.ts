import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map, tap, catchError, debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  getAllCountries():Observable<any>
  {
    return this.http.get<any>("https://restcountries.eu/rest/v2/all").pipe(
      tap(response => console.log(response)),
    );
  }
  searchResults(searchInp:string):Observable<any>
  {
    return this.http.get("https://restcountries.eu/rest/v2/name/"+searchInp).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error:HttpErrorResponse)
  {
    console.log(error);
    return throwError(error.message || "Server Error");
  }
}


