import {ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  styleUrls: ['./no-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoResultComponent implements OnInit {

  @Input() public errorMsg:string='';
    
  constructor() { }

  ngOnInit(): void {
  }

}
