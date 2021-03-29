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
      catchError(this.handleError)
    );
  }


  searchResults(searchInp: string | null): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(`${this._endpointBase}/name/${searchInp}`).pipe(
      catchError(this.handleError)
    );
  }



  countryDetails(countryName: string | null): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(`${this._endpointBase}/name/${countryName}`).pipe(
      catchError(this.handleError)
    );
  }


  countryByCode(countryCode: string | null): Observable<CountryModel> {
    return this.http.get<CountryModel>(`${this._endpointBase}/alpha/${countryCode}`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.message || "Server Error");
  }
}


