import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-spinner-wrapper',
  templateUrl: './spinner-wrapper.component.html',
  styleUrls: ['./spinner-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerWrapperComponent implements OnInit {

  constructor(
    private _spinner: NgxSpinnerService,
    private _spinnerService: SpinnerService
  ) { }


  @Input() background: string = '#323232';
  ngOnInit(): void {
    this._spinnerService.spinnerStatus.subscribe(isEnabled => {
      if (isEnabled) this._spinner.show();
      else this._spinner.hide();
    })
  }

}
