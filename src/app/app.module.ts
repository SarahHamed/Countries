import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { ReactiveFormsModule} from '@angular/forms';
import { SpinnerModule } from './core/modules/spinner/spinner.module';
import {NoResultComponent} from './shared/no-result/no-result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { countryState } from './state/country.state';
import { environment } from 'src/environments/environment';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CountryDetailsComponent,
    NoResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([countryState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsSelectSnapshotModule.forRoot(),


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
