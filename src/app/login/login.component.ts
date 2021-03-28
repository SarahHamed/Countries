import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }
  
  contactsForm = new FormGroup({
    userPassword: new FormControl('',[Validators.min(5), Validators.max(80)]),
    clientMail: new FormControl('', Validators.email),
  });
  /*
  contactsList:any=[];

  saveForm()
  {
    this.contactsList.push(this.contactsForm.value);
    localStorage.setItem("contacts",JSON.stringify(this.contactsList));
    console.log(this.contactsForm);
    //window.alert("it works!")
  }*/
  login()
  {
    this.router.navigate(['../countries'])
  }
  ngOnInit(): void {
  }

}
