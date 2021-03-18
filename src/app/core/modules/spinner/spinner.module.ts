import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerWrapperComponent } from './spinner-wrapper/spinner-wrapper.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [SpinnerWrapperComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ], 
  exports: [SpinnerWrapperComponent]
})
export class SpinnerModule { }
