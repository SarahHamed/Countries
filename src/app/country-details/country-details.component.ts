import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../country.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  countryDet:any;
  nameVal:any;

  constructor(private _countryService:CountryService, private _Activatedroute:ActivatedRoute,private router:Router) { 

    this.nameVal=this._Activatedroute.snapshot.paramMap.get("name");
   _countryService.countryDetails(this.nameVal).subscribe((data)=>{
     this.countryDet=data[0];
   })
   
  }
  back()
  {
    this.router.navigate(['../home'])
  }

  ngOnInit(): void {
  }

}
