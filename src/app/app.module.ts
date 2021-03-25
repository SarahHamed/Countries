import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import { HomeComponent } from './modules/components/home/home.component';
import { LoginComponent } from './login/login.component';
//import { CountryDetailsComponent } from './modules/components/country-details/country-details.component';
import { ReactiveFormsModule} from '@angular/forms';
import { SpinnerModule } from './core/modules/spinner/spinner.module';
//import {NoResultComponent} from './shared/components/no-result/no-result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { countryState } from './modules/state/country.state';
import { environment } from 'src/environments/environment';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CountriesModule } from './modules/countries/countries.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  //  HomeComponent,
    LoginComponent,
    //CountryDetailsComponent,
  //  NoResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    BrowserAnimationsModule,
    CountriesModule,
    SharedModule,
    NgxsModule.forRoot([countryState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsSelectSnapshotModule.forRoot(),


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
