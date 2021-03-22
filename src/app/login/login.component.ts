import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugings();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
      
    init_plugings();
  }

  ingresar(){
        console.log('Ingresando');
        this.router.navigate(['/dashboard']);
  }

}
