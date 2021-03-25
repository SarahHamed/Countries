  export class GetAllCountries {
    static readonly type = '[Country] Get All Countries';
  }
  
  export class GetCountryByName {
    static readonly type = "[Country] Get Country By Name";
    constructor(public name: string) {}
  }

  export class GetCountryByCode {
    static readonly type = "[Country] Get Country By Code";
    constructor(public code: string) {}
  }
  export class GetSearchResults {
    static readonly type = "[Country] Get Search Countries";
    constructor(public searchInp: string) {}
  }