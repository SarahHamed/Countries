import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import {CountryDetailsComponent} from './components/country-details/country-details.component';
import { FormsModule } from '@angular/forms';
//import {SharedModule} from '../../shared/shared.module';
//import {NoResultComponent} from '../../shared/components/no-result/no-result.component';
//import { AppRoutingModule } from '../../app-routing.module';
import { CountriesRoutingModule } from './countries-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { from } from 'rxjs';





@NgModule({
  declarations: [
    HomeComponent,
    CountryDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CountriesRoutingModule
  ]
})
export class CountriesModule { }
