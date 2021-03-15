import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { map, tap, catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  allCountries: any = [];
  searchInp: string = "";
  errorMessage: string = "";
  isError: boolean = false;

  public typeAhead$ = new Subject<string>()
  constructor(private countryService: CountryService) {
    countryService.getAllCountries().subscribe((data: any) => {
      this.allCountries = data;
      console.log(data)
    });
  }
  ngOnInit() {
    this._setupTypeAheadFunctionality();
  }

  onSearchInput() {
    if (this.searchInp.trim().length) this.typeAhead$.next(this.searchInp)
    else {
      this.countryService.getAllCountries().subscribe((data) => {
        this.allCountries = data;
        this.isError = false;
        console.log(data)
      });
    }

  }

  private _setupTypeAheadFunctionality() {
    this.typeAhead$.pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(term => this.countryService.searchResults(term))
    ).subscribe((data: any) => {
      this.allCountries = data;
      this.isError = false;
      console.log(data)
    },
      error => { this.errorMessage = error; this.isError = true; })

  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.typeAhead$.unsubscribe();
  }



}
