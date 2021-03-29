import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import {CountryDetailsComponent} from './pages/country-details/country-details.component';
import { FormsModule } from '@angular/forms';
import { CountriesRoutingModule } from './countries-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { CountriesCardComponent } from './components/countries-card/countries-card.component';
import { CountryDetailsCardComponent } from './components/country-details-card/country-details-card.component';
import { BordersComponent } from './components/borders/borders.component';



@NgModule({
  declarations: [
    HomeComponent,
    CountryDetailsComponent,
    SearchBarComponent,
    HeaderComponent,
    CountriesCardComponent,
    CountryDetailsCardComponent,
    BordersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CountriesRoutingModule
  ]
})
export class CountriesModule { }
