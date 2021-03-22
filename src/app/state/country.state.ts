import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import {GetAllCountries, GetCountryByName, GetCountryByCode} from './country.actions';
import { CountryService } from '../model/country.service';

export class CountryStateModel {

    public CountriesAll: any;

    constructor()
    {
        this.CountriesAll=[];
    }

}

@Injectable()
@State<CountryStateModel>({
  name: 'country',
  defaults: new CountryStateModel()
})

export class countryState {

    constructor(private _countryService: CountryService) { }

    @Selector()
    static CountriesAll(state: CountryStateModel)
    {
        return state.CountriesAll;
    }

    @Action(GetAllCountries)
    public getAllCountries(ctx: StateContext<CountryStateModel>) {
      return this._countryService.getAllCountries().pipe(
        tap(countriesData => ctx.patchState({ CountriesAll: countriesData  }))
      )
    }
}