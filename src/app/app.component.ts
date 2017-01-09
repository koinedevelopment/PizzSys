import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';

declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  ngOnInit(){

  }
  constructor(private router: Router, private authService: AuthService){
    this.authService.isLoggedIn()
      .subscribe(user => {
        if(user)
          this.router.navigate(['sabores'])
      })
  }
}
