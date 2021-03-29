import { Component, Input, OnInit } from '@angular/core';
import { CountryModel } from '../../model/countries.model';

@Component({
  selector: 'app-borders',
  templateUrl: './borders.component.html',
  styleUrls: ['./borders.component.scss']
})
export class BordersComponent implements OnInit {

  constructor() { }
  @Input() public bordersList!:string[];

  ngOnInit(): void {
  }

}
