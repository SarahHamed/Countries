import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/core/modules/spinner/spinner.service';
import { GetAllCountries, GetSearchResults } from '../../state/country.actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit , OnDestroy{

  constructor(private _spinnerService: SpinnerService, 
    private _store: Store) { }
/*
  searchInp: string = "";
  errorMessage: string="";
  isError: boolean = false;
  public typeAhead$ = new Subject<string>()
*/
  ngOnInit(): void {
  //  this._setupTypeAheadFunctionality();
  }
/*
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

  }*/
   /**
   * @description set the error
   * @param error 
   * @returns 
   */
  /*
    private _setError(error: any): Observable<any> {
      this.errorMessage = error;
      this.isError = true;
      return of([]);
    }
*/
    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
     // this.typeAhead$.unsubscribe();
    }
}
