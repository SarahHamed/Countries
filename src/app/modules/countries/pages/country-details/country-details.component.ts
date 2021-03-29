import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SpinnerService } from '../../../../core/modules/spinner/spinner.service';
import { Store } from '@ngxs/store';
import { countryState } from '../../state/country.state';
import { GetCountryByName, GetCountryByCode } from '../../state/country.actions';
import { ViewSelectSnapshot, SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { catchError } from 'rxjs/operators';
import { CountryModel } from '../../model/countries.model';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {



  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _spinnerService: SpinnerService,
    private _store: Store) {
  }



  @ViewSelectSnapshot(countryState.countryDetails) public countryDet!: CountryModel;


  public isBorderCountry: boolean = false;
  public nameVal!: string;
  public country!: string;

  public readonly CODE_TYPE = "code";
  public readonly COUNTRY_TYPE = 'country';

  errorMessage: string = "";
  isError: boolean = false;




  ngOnInit(): void {

    this._spinnerService.show();


    /* Listen to parameters changes and subscribe to it */
    this._activatedRoute.params.subscribe(params => {
      const type = params.type;
      const name = params.name;


      // Incase of clicking on border countries buttons
      if (type === this.CODE_TYPE) this._getCountryByCode(name)

      // Incase of searching by Country name
      else if (type === this.COUNTRY_TYPE) this._getCountryByName(name);
    })

  }




  /**
   * @description get Country by code
   * @param name 
   */
  private _getCountryByCode(name: string) {
    this._store.dispatch(new GetCountryByCode(name)).pipe(
      catchError(error => (this._setError(error))))
      .subscribe(() => {
        this._spinnerService.hide();
      })
  }


  /**
   * @description Get Country by name
   * @param name 
   */
  private _getCountryByName(name: string) {
    this._store.dispatch(new GetCountryByName(name)).pipe(
      catchError(error => this._setError(error)))
      .subscribe(() => {
        this._spinnerService.hide();
      })
  }



  /**
   * @description Go back to the manage page
   * @deprecated
   */
  public back() {
    this._router.navigate(['../home']);
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

}
