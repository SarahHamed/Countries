import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }


  public isEnabled = false;
  public spinnerStatus = new Subject<boolean>()

  public show() {
    this.isEnabled = true;
    this.spinnerStatus.next(this.isEnabled)
  }


  public hide() {
    this.isEnabled = false;
    this.spinnerStatus.next(this.isEnabled);
  }
}
