import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 logged: boolean;
  constructor(private AuthService: AuthenticationService) { 
  }

  ngOnInit(): void {
    this.AuthService.Logged$.subscribe(data => {this.logged = data; });
  }


}
