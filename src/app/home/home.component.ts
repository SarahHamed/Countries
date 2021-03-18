import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { map, tap,retry, catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of, Subject, throwError } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { SpinnerService } from '../core/modules/spinner/spinner.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  constructor(private countryService: CountryService, private _spinnerService: SpinnerService) {
    countryService.getAllCountries().subscribe((data: any) => {
      this.allCountries = data;
      console.log(data)
    });
  }

  allCountries: any = [];
  searchInp: string = "";
  errorMessage: string="";
  isError: boolean = false;


  public typeAhead$ = new Subject<string>()
  
  ngOnInit() {
    this._setupTypeAheadFunctionality();
    // this.spinner.show();
 
    // setTimeout(() => {
      /** spinner ends after 5 seconds */
      // this.spinner.hide();
    // }, 5000);
  }

  onSearchInput() {
    const IS_NOT_EMPTY = this.searchInp.trim().length
    this._spinnerService.show();
    if (IS_NOT_EMPTY) this.typeAhead$.next(this.searchInp)
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
      console.log(data)
    },
      //error => { this.errorMessage = error; this.isError = true; this._spinnerService.hide() }
      )

  }
/*
  private _setupTypeAheadFunctionality() {
    this.typeAhead$.pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(term => this.countryService.searchResults(term))
    ).subscribe((data: any) => {
      this.allCountries = data;
      this.isError = false;
      this._spinnerService.hide();
      console.log(data)
    },
      error => { this.errorMessage = error; this.isError = true; this._spinnerService.hide() })

  }

*/

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.typeAhead$.unsubscribe();
  }
}
