import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CountryDetailsComponent } from './modules/components/country-details/country-details.component';
import { CountryDetailsComponent } from './modules/countries/components/country-details/country-details.component';
//import { HomeComponent } from './modules/components/home/home.component';
import { HomeComponent } from './modules/countries/components/home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = 
[
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'home/countryDetail/:country/:name',component:CountryDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
