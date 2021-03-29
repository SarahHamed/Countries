import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CountryDetailsComponent } from './modules/components/country-details/country-details.component';
import { CountryDetailsComponent } from './modules/countries/pages/country-details/country-details.component';
//import { HomeComponent } from './modules/components/home/home.component';
import { HomeComponent } from './modules/countries/pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CountriesModule } from './modules/countries/countries.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Entry => countries


const routes: Routes =
  [

    // Login Page
    { path: '', component: LoginComponent },
    
    
    // Countries Module
    {
      path: 'countries',
      loadChildren: () => import('./modules/countries/countries.module').then(m => m.CountriesModule)
    },


    // Not found
    { path: "**", component: PageNotFoundComponent }
    /*{path:'home',component:HomeComponent},
    {path:'home/countryDetail/:country/:name',component:CountryDetailsComponent},*/
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CountriesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
