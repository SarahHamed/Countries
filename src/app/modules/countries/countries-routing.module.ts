import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':type/:name', component: CountryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }