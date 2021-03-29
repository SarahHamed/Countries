import { Component, Input, OnInit } from '@angular/core';
import { CountryModel } from '../../model/countries.model';

@Component({
  selector: 'app-countries-card',
  templateUrl: './countries-card.component.html',
  styleUrls: ['./countries-card.component.scss']
})
export class CountriesCardComponent implements OnInit {

  constructor() { }
  @Input() public country!:CountryModel;

  ngOnInit(): void {
  }

}
