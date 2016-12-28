import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
  
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
