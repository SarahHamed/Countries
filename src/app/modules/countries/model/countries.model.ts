
export interface CountryModel {
    name: string;
    nativeName: string;
    population: number;
    region: string;
    subregion: string;
    capital: string;
    topLevelDomain: string;
    currencies: [];
    languages: {[key: string]: string}[]; 
    flag: string;
}
/*
countryDet.name
countryDet.nativeName
country.capital
countryDet.population
countryDet.region
countryDet.subregion
countryDet.capital
countryDet.topLevelDomain
countryDet.currencies[0]['name']
<p>Languages:
<span  *ngFor="let lang of countryDet.languages">{{lang['name']}}</span>
*/