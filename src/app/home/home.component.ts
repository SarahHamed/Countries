import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CountryService } from '../model/country.service';
import { map, tap,retry, catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of, Subject, throwError } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { SpinnerService } from '../core/modules/spinner/spinner.service';
import { Select, Store } from '@ngxs/store';
import { countryState } from '../state/country.state';
import { GetAllCountries, GetSearchResults } from '../state/country.actions';
import { ViewSelectSnapshot, SelectSnapshot } from '@ngxs-labs/select-snapshot';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  constructor(
    private countryService: CountryService, 
    private _spinnerService: SpinnerService, 
    private _store: Store) {
  
   /* countryService.getAllCountries().subscribe((data: any) => {
      this.allCountries = data;
      console.log(data)
    });*/

    
  }

  //@Select(countryState.CountriesAll) public countries$: any;
  @ViewSelectSnapshot(countryState.CountriesAll) public CountriesSearchRes: any;


  allCountries: any = [];
  searchInp: string = "";
  errorMessage: string="";
  isError: boolean = false;


  public typeAhead$ = new Subject<string>()
  
  ngOnInit() {
    this._setupTypeAheadFunctionality();

    this._store.dispatch(new GetAllCountries())
   // console.log("countries$: "+this.countries$)
  }

  onSearchInput() {
    const IS_NOT_EMPTY = this.searchInp.trim().length
    this._spinnerService.show();
    if (IS_NOT_EMPTY) {
      this.isError = false;
      this.typeAhead$.next(this.searchInp)
    }
    else {
      this.countryService.getAllCountries().subscribe((data) => {
        this.allCountries = data;
        this.isError = false;
        console.log(data)
        this._spinnerService.hide();
      });
    }

  }
  
  private _setupTypeAheadFunctionality() {
    
    this.typeAhead$.pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(term => this._store.dispatch(new GetSearchResults(term)).pipe(
      catchError(error =>{
      this.errorMessage=error;
      this.isError=true;
      return of([]);
      }) ))
    ).subscribe((data: any) => {
     // this.allCountries = data;
     
      this._spinnerService.hide();
  /*    console.log("search is working");
      console.log("data or this.allCountries")
      console.log(data)
      console.log("data.country"+data.country)
      console.log(data.country.CountriesAll)
      console.log(this.CountriesSearchRes)*/
    })

  }
  /*
  private _setupTypeAheadFunctionality() {
    this.typeAhead$.pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(term => this.countryService.searchResults(term).pipe(catchError(error =>{
      this.errorMessage=error;
      return of([]);
      }) ))
    ).subscribe((data: any) => {
      this.allCountries = data;
      if(this.allCountries.length)
       this.isError = false;
      else
        this.isError=true;
      this._spinnerService.hide();
      console.log("search is working");
      console.log(data)
      console.log(this.allCountries)
    },
      //error => { this.errorMessage = error; this.isError = true; this._spinnerService.hide() }
      )

  }
  */


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.typeAhead$.unsubscribe();
  }
}
