import { Component, Input, OnInit } from '@angular/core';
import { CountryModel } from '../../model/countries.model';

@Component({
  selector: 'app-country-details-card',
  templateUrl: './country-details-card.component.html',
  styleUrls: ['./country-details-card.component.scss']
})
export class CountryDetailsCardComponent implements OnInit {

  constructor() { }
  @Input() public countryDet!:CountryModel;
  ngOnInit(): void {
  }

}
