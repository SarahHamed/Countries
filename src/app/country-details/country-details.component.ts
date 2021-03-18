import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../country.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { concat } from 'rxjs';
import { SpinnerService } from '../core/modules/spinner/spinner.service';



@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  countryDet:any;
  isBorderCountry:boolean=false;
  nameVal:string|null;
  country:string|null;

  constructor(private _countryService:CountryService, private _Activatedroute:ActivatedRoute,private router:Router, private _spinnerService: SpinnerService) { 
    //this._spinnerService.show();

    this.nameVal=this._Activatedroute.snapshot.paramMap.get("name");
    this.country=this._Activatedroute.snapshot.paramMap.get("country");

    console.log("country is "+this.country);

    
    if(this.country === "code"){
      console.log("d5lt l if");
      _countryService.countryByCode(this.nameVal).subscribe((data)=>{
        this.countryDet=data;
        this._spinnerService.hide();
      });
  }
  else if(this.country === "country"){
    console.log("d5lt l if");
    _countryService.countryDetails(this.nameVal).subscribe((data)=>{
      this.countryDet=data[0];
      this._spinnerService.hide();
    });
  }
  }
  back()
  {
    this.router.navigate(['../home']);
  }

  ngOnInit(): void {
//    this._spinnerService.show();

this._spinnerService.show();
 /*
    setTimeout(() => {
      this._spinnerService.hide();
    }, 1000);*/
  }

}
