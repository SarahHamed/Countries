import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import {map, tap, catchError, debounceTime} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allCountries:any=[];
  searchInp:string="";
  errorMessage:string="";
  isError:boolean=false;

  constructor(private countryService:CountryService)
  {
    countryService.getAllCountries().subscribe((data:any) => {
      this.allCountries=data;
      console.log(data)});
  }
  ngOnInit(){
  }

  search(inp:any)
  {
    if(this.searchInp.length>0){
    this.countryService.searchResults(this.searchInp).pipe(debounceTime(10000)).subscribe((data:any)=>{
      this.allCountries=data;
      this.isError=false;
      console.log(data)},
      error => {this.errorMessage = error; this.isError=true;})
  }
  else{
    this.countryService.getAllCountries().pipe(debounceTime(10000)).subscribe((data) => {
      this.allCountries=data;
      console.log(data)});
  }
  }


}
