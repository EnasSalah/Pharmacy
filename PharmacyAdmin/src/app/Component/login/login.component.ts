import { Component, OnInit } from '@angular/core';
import { ILoginUser } from 'src/app/ViewModel/ilogin-user';
import { AuthenticationService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: ILoginUser;
  constructor(private authService: AuthenticationService ) {
      this.user = {username: '', Password: '', grant_type: 'password'};
  }

  ngOnInit(): void {
  }
  login()
  {
console.log(this.user);
this.authService.login(this.user);
  }


}
