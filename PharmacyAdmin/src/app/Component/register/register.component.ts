import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/ViewModel/iuser';
import { AuthenticationService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: IUser;
  message: string;
  constructor(private authService: AuthenticationService ) {
    this.user = {name: '', Confirmpassword: '', Password: ''};

   }

  ngOnInit(): void {
  }
register()
{
this.authService.register(this.user);

}
ErrorHandle(){
}
}
