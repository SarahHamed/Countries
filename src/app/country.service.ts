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
  searchResults(searchInp:string|null):Observable<any>
  {
    return this.http.get("https://restcountries.eu/rest/v2/name/"+searchInp).pipe(
      catchError(this.handleError)
    );
  }
  countryDetails(countryName:string|null):Observable<any>
  {
    return this.http.get("https://restcountries.eu/rest/v2/name/"+countryName);
  }

  countryByCode(countryName:string|null):Observable<any>
  {
    return this.http.get("https://restcountries.eu/rest/v2/alpha/"+countryName);
  }

  handleError(error:HttpErrorResponse)
  {
    console.log(error);
    return throwError(error.message || "Server Error");
  }
}


