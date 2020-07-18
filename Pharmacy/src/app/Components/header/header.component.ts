import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  Logged: boolean;
  userData: string;
  constructor( public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.Logged$.subscribe( data => this.Logged = data);
    this.authService.userData$.subscribe(data => this.userData = data);
  }
logout()
{
  this.authService.logout();
}
}
