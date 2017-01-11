import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
    console.log('constructor HomeComponent')
  }

  ngOnInit() {
  
  }

  currentUser(){
    console.log(this.authService.isLoggedIn());
  }
}
