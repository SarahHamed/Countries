import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, tap,retry, catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of, Subject, throwError } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { SpinnerService } from '../../../../core/modules/spinner/spinner.service';
import { Select, Store } from '@ngxs/store';
import { countryState } from '../../state/country.state';
import { GetAllCountries, GetSearchResults } from '../../state/country.actions';
import { ViewSelectSnapshot, SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { CountryModel } from '../../model/countries.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy {

  constructor(
    private _spinnerService: SpinnerService, 
    private _store: Store) {
    
  }

  //@Select(countryState.CountriesAll) public countries$: any;
  @ViewSelectSnapshot(countryState.CountriesAll) public CountriesSearchRes!: CountryModel[];


  allCountries: any = [];
  searchInp: string = "";
  errorMessage: string="";
  isError: boolean = false;


  public typeAhead$ = new Subject<string>()
  
  ngOnInit() {
    this._setupTypeAheadFunctionality();
    this._store.dispatch(new GetAllCountries())
  }

  onSearchInput() {
    const IS_NOT_EMPTY = this.searchInp.trim().length
    this._spinnerService.show();
    if (IS_NOT_EMPTY) {
      this.isError = false;
      this.typeAhead$.next(this.searchInp)
    }
    else {
      this._store.dispatch(new GetAllCountries()).pipe(
        catchError(error => this._setError(error)) ).subscribe((data) => {
        this.isError = false;
        this._spinnerService.hide();
      });
    }

  }
  
  private _setupTypeAheadFunctionality() {
    
    this.typeAhead$.pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(term => this._store.dispatch(new GetSearchResults(term)).pipe(
      catchError(error => this._setError(error)) ))
    ).subscribe(() => {
      this._spinnerService.hide();
    })

  }



  /**
   * @description set the error
   * @param error 
   * @returns 
   */
   private _setError(error: any): Observable<any> {
    this.errorMessage = error;
    this.isError = true;
    return of([]);
  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.typeAhead$.unsubscribe();
  }

}
