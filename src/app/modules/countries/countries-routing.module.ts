import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';


const routes: Routes = [
  {path:'countries',component:HomeComponent},
  {path:'countries/countryDetail/:country/:name',component:CountryDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }