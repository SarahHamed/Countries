import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, debounceTime } from 'rxjs/operators';
import { CountryModel } from './countries.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  private  readonly _endpointBase = 'https://restcountries.eu/rest/v2';

  getAllCountries(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(`${this._endpointBase}/all`).pipe(
      tap(response => console.log(response)),
    );
  }


  searchResults(searchInp: string | null): Observable<any> {
    return this.http.get(`${this._endpointBase}/name/${searchInp}`).pipe(
      catchError(this.handleError)
    );
  }



  countryDetails(countryName: string | null): Observable<any> {
    return this.http.get("https://restcountries.eu/rest/v2/name/" + countryName).pipe(
      catchError(this.handleError)
    );
  }


  countryByCode(countryName: string | null): Observable<any> {
    return this.http.get("https://restcountries.eu/rest/v2/alpha/" + countryName).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.message || "Server Error");
  }
}


