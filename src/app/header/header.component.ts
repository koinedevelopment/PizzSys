import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = false;
  constructor(public router: Router, public authService: AuthService) {
    jQuery(".dropdown-button").dropdown({hover: true});
  }

  ngOnInit() {

    this.authService.isLoggedIn()
      .subscribe(user => {
        console.log('user: header component', user)
        if(user){
          this.isAuth = true;
        }
        else{
          this.isAuth = false;
        }
      })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
