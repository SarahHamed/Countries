import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import {GetAllCountries, GetCountryByName, GetCountryByCode,GetSearchResults} from './country.actions';
import { CountryService } from '../model/country.service';

export class CountryStateModel {

    public CountriesAll: any;
    public countryDetails: any;
    public pagination: {pageSize: number, pageIndex: number};

    constructor()
    {
        this.CountriesAll = [];
        this.pagination = {
          pageSize: 10,
          pageIndex: 0
        }
    }

}

@Injectable()
@State<CountryStateModel>({
  name: 'country',
  defaults: new CountryStateModel()
})

export class countryState {

    constructor(private _countryService: CountryService) { }


    // Shortcut 
    @Selector()
    static CountriesAll(state: CountryStateModel)
    {
        return state.CountriesAll;
    }

    @Selector() static countryDetails(state: CountryStateModel) {
      return state.countryDetails;
    }

    @Selector()
    static pagination(state: CountryStateModel) { return state.pagination }

    
    @Action(GetAllCountries)
    public getAllCountries(ctx: StateContext<CountryStateModel>) {
      return this._countryService.getAllCountries().pipe(
        tap(countriesData => ctx.patchState({ CountriesAll: countriesData  }))
      )
    }


    @Action(GetCountryByName)
    public getCountryByName(ctx: StateContext<CountryStateModel>, payload: GetCountryByName) {
      return this._countryService.countryDetails(payload.name).pipe(
        tap(countryDetails => {ctx.patchState({countryDetails:countryDetails[0]});
      })
      )
    }
    @Action(GetCountryByCode)
    public getCountryByCode(ctx: StateContext<CountryStateModel>, payload: GetCountryByCode) {
      return this._countryService.countryByCode(payload.code).pipe(
        tap(countryDetails => ctx.patchState({countryDetails}))
      )
    }

    @Action(GetSearchResults)
    public getSearchResults(ctx: StateContext<CountryStateModel>, payload: GetSearchResults) {
      console.log("term is"+ payload.searchInp );
      return this._countryService.searchResults(payload.searchInp).pipe(
        tap(countryDetails => ctx.patchState({CountriesAll:countryDetails}))
      )
    }
}


/*
  1 - User enter the page of countries
  2 - We dispatch an action to get all countries
  3 - Action called a method and trigger getAllcountires on the service
  4 - we patched the state with date returned from the request
  5 - Select lestin to the new update that happened to the state and get the new data
  6 - Async pipe subscribe to this data and re-render the view
 
 */