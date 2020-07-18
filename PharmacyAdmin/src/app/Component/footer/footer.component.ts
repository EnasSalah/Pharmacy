import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  Logged: boolean;
  userData: string;
  constructor(private appcomp: AppComponent, public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.Logged$.subscribe(data => this.Logged = data);
    this.authService.userData$.subscribe(data => this.userData = data);
  }
  toggleing() {
    this.appcomp.toggle();
  }
  logout() {
    this.authService.logout();
  }

}
