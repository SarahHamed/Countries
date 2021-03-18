import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationStart, NavigationEnd, NavigationCancel,NavigationError, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { SpinnerService } from './core/modules/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _spinnerService: SpinnerService,
    private _router: Router
    ) {}
 
  ngOnInit() {
    // /** spinner starts on init */
    // this.spinner.show();
 
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);


    this._router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => this._spinnerService.hide())

    this._router.events.pipe(
      filter(e => e instanceof NavigationStart)
    ).subscribe(e => this._spinnerService.show())


  }

  title = 'countries';
}