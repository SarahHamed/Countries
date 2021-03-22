import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../model/country.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { concat, Observable } from 'rxjs';
import { SpinnerService } from '../core/modules/spinner/spinner.service';
import { Select, Store } from '@ngxs/store';
import { countryState } from '../state/country.state';
import { GetCountryByName } from '../state/country.actions';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';



@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {



  constructor(
    private _countryService: CountryService, 
    private _activatedRoute: ActivatedRoute, 
    private _router: Router, 
    private _spinnerService: SpinnerService,
    private _store: Store) {
    //this._spinnerService.show();
  }

  @ViewSelectSnapshot(countryState.countryDetails) public countryDet: any;

  public isBorderCountry: boolean = false;
  public nameVal!: string;
  public country!: string;


  back() {
    this._router.navigate(['../home']);
  }

  ngOnInit(): void {

    this._spinnerService.show();

    this.nameVal = this._activatedRoute.snapshot.params.get("name");
    this.country = this._activatedRoute.snapshot.params.get("country");

    // console.log("country is " + this.country);


    // Incase of clicking on border countries buttons
    if (this.country === "code") {
      console.log("d5lt l if");
      this._countryService.countryByCode(this.nameVal).subscribe((data) => {
        this.countryDet = data;
        this._spinnerService.hide();
      });
    }


    // Incase of searching by Country name
    else if (this.country === "country") {
      console.log("d5lt l if");
      this._store.dispatch(new GetCountryByName(this.nameVal)).subscribe(() => {
        this._spinnerService.hide();
      })
    }
    //    this._spinnerService.show();

    /*
       setTimeout(() => {
         this._spinnerService.hide();
       }, 1000);*/
  }

}
