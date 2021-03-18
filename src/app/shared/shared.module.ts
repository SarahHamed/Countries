import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultComponent } from './no-result/no-result.component';



@NgModule({
  declarations: [NoResultComponent],
  imports: [
    CommonModule
  ],
  exports:[NoResultComponent]
})
export class SharedModule { }
